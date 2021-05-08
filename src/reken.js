'use strict';
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
*/

/*
data-text="sss${var}sss"
data-html="<div>sss${var}sss</div>"
data-value="var"
data-class="classname:boolean expression"
data-style="width:${vrb}px;otherstuff;"
data-if="boolean expression"
data-on="eventName:statement(e)"
data-action="statement(e)"
data-for="var:[iterator|number]"
data-calc=""
data-rest="iterator:[jsonpath]:rest_endpoint"
data-component="component-name"
data-attr-[prop]="aaa${var}aaa"
*/

if (typeof rkn_server_generated === 'undefined')
    var rkn_server_generated = false;
var setupFunction;
var controllerFunction;
var _setupString;
var _controllerString;
/*
 * reken.js - copyright Henry van den Broek, 2021
 */

/*
 * lines - runtime controller code.
 * setup - setup controller code.
 * elem - HTMLElement to build analyze and build control code for.
 * elemDOMId string - HTMLElement to build analyze and build control code for.
 * forRoot - contains the element of for loop's root element.
 * forString - the ancestor element id when processing for loop descendants.
 */
function buildController(lines, setup, elem, elemString, topFor, topForString) {
    if (typeof topFor == 'undefined')
        topFor = [];
    if (typeof topForString == 'undefined')
        topForString = [];

    // Sorting element to make sure data-attr-value is before data-value for checkbox and radio button
    Object.entries(elem.dataset).sort().forEach(entry => {
        const [key, value] = entry;

        switch (key) {
            case "text":
                lines.push("_v=`" + value + "`;if (" + elemString + ".textContent !== _v) " + elemString + ".textContent = _v"); // Update DOM element with HTML Element from template string if different
                break;
            case "html":
                lines.push("_v=`" + value + "`;if (" + elemString + ".innerHTML !== _v) " + elemString + ".innerHTML = _v"); // Update DOM element with HTML Element from template string if different
                break;
            case "value":
                if (elem.type == 'checkbox') {
                    if (elem.getAttribute('name'))
                        lines.push(elemString + ".checked = " + value + ".indexOf(" + elemString + ".value) > -1");
                    else
                        lines.push(elemString + ".checked = " + value);
                }
                else if (elem.type == 'radio') {
                    if (elem.getAttribute('name'))
                        lines.push(elemString + ".checked = " + value + " == " + elemString + ".value");
                    else
                        lines.push(elemString + ".checked = " + value);
                }
                else
                    lines.push(elemString + ".value = " + value);
                let eventName = "change";
                if (elem.tagName === 'TEXTAREA') {
                    eventName = 'input';
                }
                if (elem.type === 'range')
                    eventName = 'input';
                if (topFor.length == 0 || topFor[0] == elem)
                    setup.push(elemString + ".addEventListener('" + eventName + "', " + eval("((e)=> {" + value + "=typedReturn(e.target," + value + ");controllerFunction();})") + ")");
                else {
                    let evt_id_var = uniqueID() + 'evt_id';
                    setup.push(evt_id_var + " = uniqueID()");
                    setup.push(elemString + ".dataset.event_id = " + evt_id_var);
                    setup.push(topForString[0] + "[" + evt_id_var + "] = " + eval("(e)=> {if (e.target.dataset.event_id !== " + evt_id_var + ") return;let ctxIdx = indexesInForAncestors(e.target);" + getEventContextString(elem) + ";" + value + "=typedReturn(e.target," + value + "); controllerFunction();}"));
                    setup.push(topForString[0] + ".addEventListener('" + eventName + "', " + topForString[0] + "[" + evt_id_var + "])");
                }
                break;
            case "style":
                lines.push("_v=`" + value + "`;if (" + elemString + ".getAttribute('style') !== _v) " + elemString + ".setAttribute('style',  _v)"); // Update DOM element with HTML Element from template string if different

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
                lines.push(elemString + ".classList.toggle('" + _class + "', " + _expr + ")");
                break;
            case "if":
                lines.push(elemString + ".style.display=(" + value + "?'':'none');");
                break;
            case "on":
                let _eventName = value.substring(0, value.indexOf(':'));
                let _handler = value.substring(value.indexOf(':') + 1);
                eventHandlerBuilder(setup, elem, elemString, topFor, topForString,_eventName, _handler)
                break;
            case "action":
                eventHandlerBuilder(setup, elem, elemString, topFor, topForString, 'click', value)
                break;
            case "for":
                topFor.push(elem);
                topForString.push(elemString);
                //                }
                //let currentFor = elem;
                let currentForString = elemString;

                let _var = value.substring(0, value.indexOf(':'));
                let _data = value.substring(value.indexOf(':') + 1);
                let _arrayName = '_arr_' + uniqueID();
                if (isNaN(_data))
                    lines.push(_arrayName + ' = (typeof '+_data+' !== "number"?'+_data+': new Array(parseInt(' + _data + ')))');
                else
                    lines.push(_arrayName + ' = new Array(parseInt(' + _data + '))');
                lines.push('updateForChildren(' + currentForString + ',' + _arrayName + ')');

                // At runtime loop thru the direct children
                let _forVar = "rkn_forElem_" + uniqueID();
                let _forIndex = "rkn_counter_" + uniqueID();
                lines.push(_forIndex + " = 0");
                setup.push("for (" + _forVar + " of " + currentForString + ".children){");
                let _setupLength = setup.length;
                lines.push("for (" + _forVar + " of " + currentForString + ".children){");
                lines.push("if (" + _forIndex + ">=" + _arrayName + ".length) break;"); //Basically if 0 elements in array
                lines.push(_var + "= {index:" + _forIndex + ", item:" + _arrayName + "[" + _forIndex + "]}"); // Set the var context
                buildController(lines, setup, elem.children[0], _forVar, topFor, topForString);
                lines.push(_forIndex + "+=1");
                lines.push('}' + '// End loop ' + _forVar);
                if (_setupLength === setup.length) // check if there is anything to loop over.
                    setup.pop();
                else
                    setup.push('}' + '// End loop ' + _forVar);
                topFor.pop(elem);
                topForString.pop(elemString);

                break;
            case "calc":
                lines.push(elem.textContent.trim());
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
                lines.push("processRestCall(" + elemString + ",`" + _url + "`, (js)=>{" + _array + "=js" + path + ";})");
                break;
            default: {
                if (key.startsWith('attr')) {
                    if (typeof elem.dataset.component === 'undefined') {
                        let _attr = key.substring(4).toLowerCase();
                        lines.push(elemString + ".setAttribute('" + _attr + "', `" + value + "`)");
                        //                        lines.push("console.log("+elemString + ".getAttribute('"+_attr+"'), "+elemString+".value)")
                    }
                }
            }
        }
    });
    let i = 0;
    if (elem.dataset.for === undefined) {
        for (let child of elem.children) {
            buildController(lines, setup, child, elemString + ".children[" + i + "]", topFor, topForString);
            i++;
        }
    }
}
function eventHandlerBuilder(setup, elem, elemString, topFor, topForString, eventName, handler) {
    if (topFor.length == 0)
        setup.push(elemString + ".addEventListener('"+eventName+"', ((e)=> {" + handler + "; controllerFunction()}) )");
    else {
        let evt_id_var = uniqueID() + 'evt_id';
        setup.push(evt_id_var + " = uniqueID()");
        setup.push(elemString + ".dataset.event_id = " + evt_id_var);
        //Reference to event listener action on the roo for element so we can use in testing event processing
        setup.push(topForString[0] + "[" + evt_id_var + "] = " + eval("(e)=> {if (typeof e.target.dataset.action === 'undefined') return;" + "let ctxIdx = indexesInForAncestors(e.target);" + getEventContextString(elem) + ";" + handler + "; controllerFunction();return false;}"));
        setup.push(topForString[0] + ".addEventListener('" + eventName + "', " + topForString[0] + "[" + evt_id_var + "])");
    }
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
            controllerFunction();
            elem.classList.add("reken-rest-done");
        })
        .catch(error => {
            elem.classList.add("reken-rest-error");
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

function getForContextString(forElem, idxName) {
    let value = forElem.dataset.for;
    let _var = value.substring(0, value.indexOf(':'));
    let _data = value.substring(value.indexOf(':') + 1);

    return (_var + "= {index:" + idxName + ", item:" + _data + "[" + idxName + "]};");
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
        let _childTemplate = _children[0].cloneNode(true);
        _childTemplate.querySelectorAll('[id]').forEach(_childElem => {
            _childElem.id = '';
        })
        _childTemplate.id = '';
        for (let i = 0; i < array.length; i++) {
            let _child;
            if (i < _numberOfChildren) { // There is an element for this array instance
                _child = _children[i];
            }
            else { // No child yet create it
                _child = _childTemplate.cloneNode(true);
                //          _child.id = uniqueID()
                elem.appendChild(_child);
            }
            _children[i].style.display = '';
        }
        for (let i = array.length; i < _numberOfChildren; i++) {
            _children[i].style.display = 'none';
        }
    }
}

var _ID = 0;
function uniqueID() {
    //    return 'rkn' +parseInt(Math.random()*Number.MAX_SAFE_INTEGER) // Change of collisions will super small
    return 'rkn' + _ID++; // Change of collisions will super small
}

if (!rkn_server_generated) {
    let controller = [];
    controller.push('console.time("reken-controller")');
    controller.push('_r = document.body.parentElement');
    let setup = ['_r = document.body.parentElement'];
    buildController(controller, setup, document.body.parentElement, "_r");
    controller.push('console.timeEnd("reken-controller")');

    _setupString = setup.join('\n');
    console.log(_setupString);
    _controllerString = controller.join('\n');
    console.log(_controllerString);

    setupFunction = new Function(_setupString);
    //console.log(setupFunction);
    controllerFunction = new Function(_controllerString);
    // console.log(controllerFunction);

    if (typeof rkn_download_controller !== 'undefined') {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(
                'function setupFunction(){\n' +
                _setupString +
                '}\n' +
                'function controllerFunction(){\n' +
                _controllerString +
                '}\n' +
                'rkn_server_generated = true\n'
            ));
        element.setAttribute('download', document.title + '.js');
        element.textContent = "Download Reken page controller";
        document.body.appendChild(element);
    }
}
setupFunction();
controllerFunction();

