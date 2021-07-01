'use strict';

/*
 * reken.js - copyright Henry van den Broek, 2021
 */

/*
* Reken supports the following DOM databindings
* - data-text: Update the textContent with the evaluated template string.
* - data-html: Update the innerHTML with the evaluated string. Note data- bindings in the HTML will be ignored 
* - data-value: Bind a javascript variable to an input control and adds a default change or update listener:
*   * input types: text, number have a change listener and have respective text and number values.
*   * input type: range have an update! listener and returns a number value
*   * checkbox: has change listener and takes a boolean, if multiple checkboxes are grouped by the name attribute it takes an array
*   * radio: has a change listener and takes a boolean, if multiple are grouped by the names attribute it takes a string.
* - data-style: Update the style attribute with a an evaluated template string.
* - data-class: Takes a classname and an boolean expression that resolves in adding the classname when true and removing when false. If not boolean expression if provided the classname with be resolved into a boolean expression.
* - data-if: Takes a boolean expression, when true the element is shown, false the element is hidden (display:none)
* - data-on: Takes a eventName following by js code that gets executed in the event. with the variable e the event details are made available.
* - data-for: Takes a var name following by a iterating javascript iterable object or a number. The first child of the element containing data-for will be replicated with the number of the elements in the iterable object or the number of times specifed. in the for loop the var element will contain property index and with an iterable object the item property. Nested loops a are allowed.
* - data-rest: Takes a javascript variable and a rest service JSON endpoint. Once the rest service is resolved the javascript variable contains the object representing the json. An optional property path in the resultsset can be specified. When the url changes the rest call gets executed again. The url can is an evaluated template string. That is how you can parameterize your rest calls.
* - data-calc: Set this on an script tag that needs to be excuted everytime there is a model update. Use for example to recalculate formulas.
* - data-component: Define and reference a component.
* - data-arg-*: Define and reference component arguments.
*/
if (typeof rkn_server_generated === 'undefined')
    var rkn_server_generated = false;
if (typeof rkn_generate_code === 'undefined')
    var rkn_generate_code = false;
var setupFunction;
var controllerFunction;
var _setupString;
var _controllerString;
function buildClasses(componentRoot, elem, elemString, compString, topForString, definition, initCode, controlCode, eventCode, styles) {
    if (elem.tagName == "TEMPLATE")
        return; //Ignore template tags

    // Fetch any data-attrs and order them in the processing order
    let keys = Object.keys(elem.dataset).sort();

    if (componentRoot) {
        let keysToRemove = ['component']
        for (let key of keys) {
            if (key.startsWith('arg') > 0)
                keysToRemove.push(key)
        }
        for (let key of keysToRemove) {
            let componentIndex = keys.indexOf(key)
            if (componentIndex >= 0)
                keys.splice(componentIndex, 1)
        }
    }
    else {
        if (keys.indexOf('component')>=0) {
            let filteredKeys = ['component']
            for (let key of keys) {
                if (key.startsWith('arg'))
                    filteredKeys.push(key)
            }
            keys = filteredKeys;
        }
    } 

    let orderedKeys = []
    let firsts = ['component', 'if', 'for', 'attr-value']; // Need to be first in that order.
    for (let first of firsts) {
        let indexInKeys = keys.indexOf(first);
        if (indexInKeys >= 0) {
            orderedKeys.push(first)
            keys.splice(indexInKeys,1)
        }
    }
    for (let key of keys) {
        orderedKeys.push(key)
    }
    let indent = "    "
    for (let key of orderedKeys) {
        const value = elem.dataset[key];

        if (elem.id != '' && elemString != "this.root" && elemString === compString)
            elemString = "document.getElementById('"+elem.id+"')"

        switch (key) {
            case "text":
                controlCode.push(indent+"_v = `" + value + "`;\n    if (" + elemString + ".textContent !== _v)\n      " + elemString + ".textContent = _v"); // Update DOM element with HTML Element from template string if different
                break;
            case "html":
                controlCode.push("_v=`" + value + "`;if (" + elemString + ".innerHTML !== _v) " + elemString + ".innerHTML = _v"); // Update DOM element with HTML Element from template string if different
                break;
            case "value":
                if (elem.type == 'checkbox') {
                    if (elem.getAttribute('name'))
                        controlCode.push(indent + elemString + ".checked = " + value + ".indexOf(" + elemString + ".value) > -1");
                    else
                        controlCode.push(indent + elemString + ".checked = " + value);
                }
                else if (elem.type == 'radio') {
                    if (elem.getAttribute('name'))
                        controlCode.push(indent + elemString + ".checked = " + value + " == " + elemString + ".value");
                    else
                        controlCode.push(indent + elemString + ".checked = " + value);
                }
                else
                    controlCode.push(indent + elemString + ".value = " + value);
                let eventName = "change";
                if (elem.tagName === 'TEXTAREA' || elem.type === 'range') {
                    eventName = 'input';
                }

                let eventId = eventName+"_"+uniqueID();
                initCode.push(compString + ".dataset.event_id = '" + eventId+"'");
                eventCode.push({
                    'elemId':(topForString === undefined ? compString : topForString),
                    'eventType':eventName,
                    'handlerEventCheck': "  if (e.target.dataset.event_id !== '" + eventId + "') return;",
                    'handlerName': eventId,
                    'handlerCode':(value + "=typedReturn(e.target," + value + ");"),
                    'forContext': "let ctxIdx = indexesInForAncestors(e.target);" + getEventContextString(elem) + ";"
                })
                break;
            case "style":
                controlCode.push("_v=`" + value + "`;if (" + elemString + ".getAttribute('style') !== _v) " + elemString + ".setAttribute('style',  _v)"); // Update DOM element with HTML Element from template string if different
                break;
            case "class":
                let _class, _expr;
                if (value.indexOf(':') >= 0) {
                    _class = value.substring(0, value.indexOf(':'));
                    _expr = value.substring(value.indexOf(':') + 1);
                }
                else {
                    _class = _expr = value; //Shorthand for set class based on the name of the boolean var.
                }
                controlCode.push(elemString + ".classList.toggle('" + _class + "', " + _expr + ")");
                break;
            case "if":
                controlCode.push(elemString + ".style.display=(" + value + "?'':'none');");
                break;
            case "action": {
                    let eventName = "click";
                    let eventId = eventName+"_"+uniqueID();
                    initCode.push(compString + ".dataset.event_id = '" + eventId+"'");

                    eventCode.push({
                        'elemId':(topForString === undefined ? compString : topForString),
                        'eventType':eventName,
                        'handlerEventCheck': "  if (e.target.dataset.event_id !== '" + eventId + "') return;",
                        'handlerName': eventId,
                        'handlerCode':value,
                        'forContext': "let ctxIdx = indexesInForAncestors(e.target);" + getEventContextString(elem) + ";"
                    })
                }
                break;
            case "on": {
                    let eventName = value.substring(0, value.indexOf(':'));
                    let handler = value.substring(value.indexOf(':') + 1);
                    let eventId = eventName+"_"+uniqueID();
                    initCode.push(compString + ".dataset.event_id = '" + eventId+"'");
    
                    eventCode.push({
                        'elemId':(topForString === undefined ? compString : topForString),
                        'eventType':eventName,
                        'handlerEventCheck': "  if (e.target.dataset.event_id !== '" + eventId + "') return;",
                        'handlerName': eventId,
                        'handlerCode':handler,
                        'forContext': "let ctxIdx = indexesInForAncestors(e.target);" + getEventContextString(elem) + ";"
                    })
                }
                break;
    
            case "for":
                if (topForString === undefined)
                    topForString = elemString
                let _var = value.substring(0, value.indexOf(':'));
                let _data = value.substring(value.indexOf(':') + 1);
                let _arrayName = '_arr_' + uniqueID();
                if (isNaN(_data)) {
                    controlCode.push(indent+'let ' +_arrayName + ' = (typeof ('+_data+') !== "number"?'+_data+': new Array(parseInt(' + _data + ')))');
                }
                else
                    controlCode.push(indent+'let '+ _arrayName + ' = new Array(parseInt(' + _data + '))');
                controlCode.push(indent+'updateForChildren(' + elemString + ',' + _arrayName + ')');

                // At runtime loop thru the direct children
                let _forVar = "rkn_forElem_" + uniqueID();
                let _forIndex = "rkn_counter_" + uniqueID();
                controlCode.push(indent+"let " + _forIndex + " = 0");

                controlCode.push(indent+"for (let " + _forVar + " of " + elemString + ".children){");
                controlCode.push(indent+"if (" + _forIndex + ">=" + _arrayName + ".length) break;"); //Basically if 0 elements in array
                controlCode.push(indent+"let " + _var + "= {index:" + _forIndex + ", item:" + _arrayName + "[" + _forIndex + "]}"); // Set the var context

                let i = 0;
                for (let child of elem.children) { // Only execute controller code for children of elements with a data-if expression that is true, ie the element is shown.
                    buildClasses(false, elem.children[i], _forVar, compString+ ".children[" + i + "]", topForString, definition, initCode, controlCode, eventCode, styles)
                    i++;
                }
                controlCode.push(indent+_forIndex + "+=1");
                controlCode.push(indent+'}' + '// End loop ' + _forVar);
                break;
            case "calc":
                controlCode.push(elem.textContent.trim());
                break;
            case "component":
                topForString = undefined; //Reset the outermost for-loop.
                if (!generatedClass[value]) {

                    let compInitCode = [];
                    let compControlCode = [];
                    let compEventCode = [];

                    buildClasses(true, elem, "this.root", "this.root", topForString, definition, compInitCode, compControlCode, compEventCode, styles)

                    if (elem.dataset.for === undefined) { // Process the children unless the component definition also has a for loop, then the children will be processed there.
                        let i = 0;
                        for (let child of elem.children) { // Only execute controller code for children of elements with a data-if expression that is true, ie the element is shown.
                            let elemString = "this.root"
                            buildClasses(false, child, elemString + ".children[" + i + "]", elemString + ".children[" + i + "]", topForString, definition, compInitCode, compControlCode, compEventCode, styles)
                            i++
                        }
                    }
                    const [compDefinition, compStyle] = generateComponentClass(value, compInitCode, compControlCode, compEventCode)
                    styles.push(...compStyle);
                    definition.push(...compDefinition)
                    definition.push(`classRegistry['${value}']=${value}`)
                    generatedClass[value] = true;
                }

                //Add code for class initialization, root component instances in setup, childcomponent instances in class definition
                initCode.push(`    ${compString}.rkn_class = new ${value}(${compString})`)

                controlCode.push("    {"); 
                let args = []
                for (let attr of Object.keys(elem.dataset)) {
                    if (attr.startsWith("arg")) {
                        let arg = attr.substring(3).toLowerCase()
                        let value = elem.dataset[attr]
                        //Check if variable
                        if (/^[a-zA-Z_$][0-9a-zA-Z_$/.]*$/.test(value))
                            controlCode.push("      let " + arg + " = (typeof " + value + "!== 'undefined'?"+value+":'"+value+"')")
                        //Check if number
                        else if (!isNaN(value)) {
                            controlCode.push("      let " + arg + ' = ' +value)
                        }
                        //Otherwise template string
                        else
                            controlCode.push("      let " + arg + ' = ' + "`"+value+"`")
                        args.push(`${arg}`)
                    }
                }
                controlCode.push(`      ${elemString}.rkn_class.controller(${args.join(',')})`)
                controlCode.push('    }')
                break;
            case "rest":
                let _array = value.substring(0, value.indexOf(':'));
                let _url = value.substring(value.indexOf(':') + 1);
                let path = '';
                let nextTokenIndex = _url.indexOf(':')
                if (nextTokenIndex > 0 && !_url.startsWith('http')) {
                    path = '.' + _url.substring(0, nextTokenIndex);
                    _url = _url.substring(nextTokenIndex + 1);
                }
                controlCode.push("    processRestCall(" + elemString + ",`" + _url + "`, (js)=>{" + _array + "=js" + path + ";_mainInstance.controller()})");
                break;

            default: {
                if (key.startsWith('attr')) {
                    let _attr = key.substring(4).toLowerCase();
                    controlCode.push(elemString + ".setAttribute('" + _attr + "', `" + value + "`)");
                }

            }
        }
    }
    if (!elem.dataset.component && !elem.dataset.for) { // Elements with Component and For process their own children
        if (elem.dataset.if !== undefined && elem.children.length>0)
            controlCode.push('if ('+elem.dataset.if +') {') // Only execute controller code for children of elements with a data-if expression that is true, ie the element is shown.

        let i = 0;
        for (let child of elem.children) { 
            buildClasses(false, child, elemString + ".children[" + i + "]", compString + ".children[" + i + "]", topForString, definition, initCode, controlCode, eventCode, styles)
            i++
        }
        if (elem.dataset.if !== undefined && elem.children.length>0)
            controlCode.push('}')
    }            
}

const processComponentReferences = (elem) => {
    //Process component references
    if (elem.tagName != 'TEMPLATE' && 'component' in elem.dataset) {
        let component = getComponent(elem.dataset.component)
        if (component != null) { //Should be there unless component definition does not exist.
            let _slotElement = component.querySelector('[data-slot]')
            if (_slotElement !=null && elem.childNodes.length > 0) { // Process slot
                let _beforeElement = _slotElement;
                for (let i = elem.childNodes.length-1; i >= 0; i--) {
                    let child = elem.childNodes[i];
                    _slotElement.parentElement.insertBefore(child, _beforeElement)
                    _beforeElement = child;
                }
                _slotElement.parentElement.removeChild(_slotElement)
            }
            for (let attr of elem.getAttributeNames()) { //Copy the attributes
                if (component.getAttribute(attr)==null) {
                    if (elem.getAttribute(attr)!=null) {
                        component.setAttribute(attr, elem.getAttribute(attr))
                    }
                }
                else {
                    if (attr.startsWith('data-arg'))
                        component.setAttribute(attr, elem.getAttribute(attr))
                    if (attr == 'class')
                        component.classList.add(elem.getAttribute('class'))
                        
                }
            }
            elem.parentElement.replaceChild(component, elem)
        }
    }
    else {
        for (let child of elem.children) {
            processComponentReferences(child)
        }
    }
}
let componentRegistry = {}
let classRegistry = {}
let generatedClass = {}

const getComponent = (componentName) => {
    let component = componentRegistry[componentName];
    if (component === undefined) {
        let template = document.querySelector(`template[data-component='${componentName}']`)
        if (template == null || template.content == null || template.content.children.length == 0) {
            console.error(`Component ${componentName}: no component definition found`)
            return null;
        }
        for (let elem of template.content.children) {
            if (elem.tagName !== 'STYLE' && elem.tagName !== 'SCRIPT') {
                component = elem;
                break;
            }
        }
        processComponentReferences(component) // Process component children
        component.setAttribute('data-component', componentName)
        componentRegistry[componentName] = component;
    }
    let componentClone = component.cloneNode(true);
    return componentClone;
}

function generateComponentClass(componentName, compInitCode, compControlCode, compEventCode) {
    let templateElement = document.querySelector("template[data-component='"+componentName+"']")

    let output = []
    // Build constructor 
    output.push(`class ${componentName} {`);
    output.push('  constructor(root) {');
    output.push('    this.root = root;');
    // Add references to top descendant classes
    output.push(...compInitCode)
    // State initialization
    const [stateVars, initCode] = getStateVars(templateElement)
    output.push(...initCode)
    for (let _var of stateVars)
        output.push(`    this.${_var} = ${_var}`)

    //Add event registrations
    for (let event of compEventCode)
        output.push('    '+event.elemId + ".addEventListener('" + event.eventType + "', event => this."+event.handlerName+"(event))");

    output.push('  }')

    // Create static factory method
    output.push('  static createInstance(elem) {')
    output.push(`    return new ${componentName}(elem);`)
    output.push('  }')


    // Build controller
    const initArgs = getInitArgs(templateElement)
    output.push(`  controller(${initArgs.join(',')}) {`)

    for (let _var of stateVars)
        output.push(`    let ${_var} = this.${_var}`)

    if (compControlCode.length>0)
        output.push(`    let _v`)
        output.push(...compControlCode)

    for (let argAssign of initArgs) {
        let arg = argAssign.substring(0,argAssign.indexOf('='))
        output.push("    this." + arg +" = " + arg) 
    }
    output.push('  }')


    // Build events
    for (let event of compEventCode) {
        output.push("  "+ event.handlerName+"(e) {")
        output.push("  " + event.handlerEventCheck);

        // set state vars
        for (let _var of stateVars)
            output.push(`    let ${_var} = this.${_var}`)

        // set args from state
        for (let argAssign of initArgs) {
            let arg = argAssign.substring(0,argAssign.indexOf('='))
            output.push("    let " + arg +" = this." + arg) 
        }
    
        //Add for loop context(s)
        output.push("    " + event.forContext);
        //Add event handler code
        output.push("    " + event.handlerCode)   
    
        for (let _var of stateVars)
            output.push(`    this.${_var} = ${_var}`)
         
        output.push("    _mainInstance.controller()");
        output.push("  }");
    }
    //end class
    output.push('}')
    return [output, getStyle(templateElement)]
}
// Load first template script and isolate the state variables.
function getStateVars(templateElement) {
    let stateVars = []
    let initCode = []
    if (templateElement) {
        let scriptElement = templateElement.content.querySelector('script')
        if (scriptElement != null && scriptElement.childNodes.length>0) {
            let _code =  scriptElement.textContent.split(/\r?\n/); // Create array of state init code.
            for (let line of _code) {
                line = line.trim()
                if (line == '')
                    continue;
                initCode.push('    '+line); // Add state init code to class constructor
                let assignment = line.split(/=? /) // If assigment add it is a class member and initialize
                let _var = assignment[1];
                stateVars.push(_var)
            }
        }
    }
    return [stateVars, initCode]
}
// Find the component arguments
function getInitArgs(templateElement) {
    let args = []
    if (templateElement) {

        for (let attr of Object.keys(templateElement.dataset)) {
            if (attr.startsWith("arg")) {
                let arg = attr.substring(3).toLowerCase()
                let value = templateElement.dataset[attr]
                if (value != "")
                    arg += `=${isNaN(value)?"'"+value+"'":value}`
                else
                    arg += '=""' // Default is empty string
                args.push(arg)
            }
        }
    }
    return args
}
// FInd the first style tag for a component and prepend with the component selector
function getStyle(templateElement) {
    if (templateElement && templateElement.content.querySelector('style')) {
        let rekenStyle = templateElement.content.querySelector('style')
        if (rekenStyle != null && rekenStyle.textContent) {
            let componentName = templateElement.dataset.component;
            let _styleLines =  rekenStyle.textContent.split(/\r?\n/); // Create array of styles
            for (let i = 0; i < _styleLines.length; i++) {
                if (_styleLines[i].indexOf('{')>0) {
                    let _hostPosition = _styleLines[i].indexOf(':host')
                    if (_hostPosition >= 0)
                        _styleLines[i] = _styleLines[i].substring(_hostPosition+5)
                    _styleLines[i] = `[data-component=${componentName}]` + _styleLines[i];
                }
            }
            return _styleLines;
        }
    }
    return [];
}
// Generates the code that sets up the context before the event code gets executed.
function getEventContextString(elem, idxHolder) {
    if (typeof idxHolder === 'undefined')
        idxHolder = { idx: 0 };
    let _contextString = '';
    let _parent = elem.parentElement;
    if (_parent != null) {
        _contextString = getEventContextString(_parent, idxHolder);

        if (typeof _parent.dataset.for !== 'undefined') {
            return _contextString + getForContextString(_parent, 'ctxIdx[' + (idxHolder.idx++) + ']');
        }
    }
    return _contextString;
}

// Generate the code that sets up the context for when processing elements in a for loop.
function getForContextString(forElem, idxName) {
    let value = forElem.dataset.for;
    let _var = value.substring(0, value.indexOf(':'));
    let _data = value.substring(value.indexOf(':') + 1);

    let _return = "let " + _var + "= {index:" + idxName + "};"
    _return += "if (typeof ("+_data+") !== 'number' && typeof ("+_data+") !== 'undefined')"+_var+"['item'] = "+ _data  + "[" + idxName + "];"
    return _return;
}
/* Runtime Helpers *********************************************************************************************************/
function processRestCall(elem, _url, modelUpdate) {
    // Url request is the same as last time, no need to fetch again and thus nothing do here.
    if (typeof elem.dataset.url !== undefined && elem.dataset.url === _url) {
        return;
    }
    elem.dataset.url = _url;
    elem.classList.add("reken-rest-busy");
    elem.classList.remove("reken-rest-error", "reken-rest-done");
    fetch(_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, code ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            modelUpdate(json)
            elem.classList.add("reken-rest-done");
        })
        .catch(error => {
            elem.classList.add("reken-rest-error");
            throw error;
        })
        .finally(() => {
            elem.classList.remove("reken-rest-busy");
        })
}

function typedReturn(elem, value) {
    switch (elem.type) {
        case "checkbox":
            if (elem.getAttribute('name')) {
                if (elem.checked && value.indexOf(elem.value) < 0)
                    value.push(elem.value);
                if (!elem.checked && value.indexOf(elem.value) > -1)
                    value.splice(value.indexOf(elem.value), 1);
                return value;
            }
            else
                return elem.checked;
        case "radio":
            if (elem.getAttribute('name'))
                return elem.value;
            else
                return elem.checked;
        case "number":
        case "range":
            return elem.valueAsNumber;
        default:
            return elem.value;
    }
}

function indexesInForAncestors(elem, indexes) {
    if (typeof indexes === 'undefined')
        indexes = [];
    let parent = elem.parentElement;
    if (parent != null) {
        indexesInForAncestors(parent, indexes);
        if (typeof parent.dataset.for != 'undefined')
            indexes.push(indexOf(parent.children, elem));
    }
    return indexes;
}

function indexOf(list, item) {
    let i = 0;
    for (let value of list) {
        if (value === item)
            return i;
        i++;
    }
    return -1;
}

function updateForChildren(elem, array) {
    let _children = elem.children;
    let _numberOfChildren = _children.length;
    if (_numberOfChildren > 0) {
        
        let _firstChild = _children[0];
        _firstChild.removeAttribute('id');
        _firstChild.querySelectorAll('[id]').forEach(_childElem => {
            _childElem.removeAttribute('id');

        })
        let _childTemplate = _firstChild.cloneNode(true);

        for (let i = 0; i < array.length; i++) {
            let _child;
            if (i < _numberOfChildren) { // There is an element for this array instance
                _child = _children[i];
            }
            else { // No child yet create it
                _child = _childTemplate.cloneNode(true);

                elem.appendChild(_child);
            }
            initComponentElement(_child)
            _children[i].style.display = '';
        }
        for (let i = array.length; i < _numberOfChildren; i++) {
            _children[i].style.display = 'none';
        }
    }
}

let initComponentElement = (elem) => {
    if (elem.dataset.component !== undefined) {
        if (elem.rkn_class === undefined) {
            elem.rkn_class = classRegistry[elem.dataset.component].createInstance(elem)
        }
        return;
    }
    for (let child of elem.children) {
        initComponentElement(child)
    }
}

var _ID = 0;
function uniqueID() {
    //    return 'rkn' +parseInt(Math.random()*Number.MAX_SAFE_INTEGER) // Change of collisions will super small
    return 'rkn' + _ID++; // Change of collisions will super small
}

processComponentReferences(document.body.parentElement);

if (!rkn_server_generated) {
    let definition = [];
    let controller = [];
    //let setup = ['_r = document.body.parentElement'];
    let setup = [];
    let styles = ['template {display:none !important;}'];

    document.body.parentElement.setAttribute('data-component', '_main')
    buildClasses(false, document.body.parentElement, "_r", "_r", undefined, definition, setup, controller, [], styles)
    if (styles.length>0) {
        const headElem = document.querySelector('head');
        if (headElem == null) {
            headElem = document.createElement('head');
            document.body.parentElement.insertBefore(headElem, document.body)
        }
        const styleElem = document.createElement('style');
        styleElem.textContent = styles.join('\n')
        headElem.appendChild(styleElem);
    }

    definition.push("let _mainInstance = _main.createInstance(document.body.parentElement)")
    definition.push("document.body.parentElement.rkn_class = _mainInstance");

    definition.push("_mainInstance.controller()")
    let definitionString = definition.join('\n')
    let controllerFunction = new Function(definitionString);
    controllerFunction();
    if (rkn_generate_code) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(
                '<script>var rkn_server_generated = true</script>\n'+
                '<script src="../src/reken.js"></script>\n'+
                '<style>\n' +
                  styles.join('\n') +
                '</style>\n' +
                '<script>\n' +
                  definitionString +
                '</script>\n'
            ));
            console.log(styles.join('\n'))
            console.log(definitionString)
        
        element.setAttribute('download', document.title + '.txt');
        element.textContent = "Download Reken page controller";
        document.body.appendChild(element);
    }
}