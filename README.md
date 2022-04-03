# ![Reken logo; blue html representing elements intertwined with orange reken elements](/assets/reken-logo.png)

**Reken** _Dutch singular verb for calculate. Pronounce: **Ray - ken**_

**With Reken you can create fast, reactive, HTML compliant web pages without virtual DOM overhead or the need for build tools.**

# Reken website
For live demos, REPL and more info check the [Reken website ➞](http://www.reken.dev)
# Why use Reken?

### Easy creation of Dynamic Web pages with just HTML, CSS and a few  sprinkles of Javascript.
- Build dynamic DOM based standard HTML with a few Reken HTML attributes.
- No need to learn new markup such as JSX or TSX.
- Just 1 DOM tree, without the need for Virtual DOM trees.
- Reken only updates DOM that needs changing.
- No need to install any tooling.
- ES6 Based. (Sorry no IE).
- HTML compliant web pages.
- Can hydrate search engine friendly server side generated content.

# Who is Reken for?
- HTML page developers, that need some interactivity.
- UX designers, that want to make their UI mockups come alive
- Developers looking to build a quick prototype or minimal viable product.
- Web app builders building light-weight apps.


# How does Reken work?
Reken relies on a few 'data-*' attributes that empower any HTML element to:
- Render dynamic content, attributes and styles.
- Conditional renders or toggles classes.
- Create repeating HTML such as selections, lists or tables.
- Makes it real easy to accept and process user input through events.
- Loads from a JSON REST endpoint and provides classes to monitor the rest call status.
- Automatically updates the DOM.

When a page with Reken attributes is loaded, Reken will build a setup controller and a runtime controller.

It will then run the setup controller once to register any event listeners.

After setup is completed it will run the runtime controller which will update any dynamic DOM when needed. The runtime controller will run again after any Reken-managed event listener fires or rest call finishes.

# Here an example
````
<script>
    let name = 'World';
</script>

<h1 data-text="Hello ${name}"></h1>
````
# Installation
Install Reken.js on your server and add a script tag **at the bottom of your web page** between the the end body and before the end html tag.
````
  ...
  </body>
  <script src="reken.js"></script>
</html>
````
# Browser support
Reken relies on a number of ES6 features and therefor supports the following browsers:
- Chrome
- Safari
- Firefox
- Chrome Edge

# Reken supports the following attributes
- **data-text**; Update the textContent of the element with the evaluated template string. _data-text="text before ${expression} regular text"_
- **data-html**: Update the innerHTML of the element with the evaluated template string. Note Reken attributes in the resulting HTML will be ignored. 
_data-html="&lt;emp>${someexpression}&lt;/emp>&lt;span>${anotherexpression}&lt;/span>"_
- **data-value**: Bind a javascript variable to an  input element and add a default change or update listener. 
    - input types: **text, number** get a **change** listener.
    - input type: **range** gets an **update** listener
    - input type: **checkbox**: gets a **change** listener and takes a boolean. If multiple checkboxes are grouped by the **name** attribute it takes an array.
    - input type: **radio** gets a **change** listener and takes a boolean, if multiple radios are grouped by the **name** attribute it takes a string.
    - input type: **file** takes a javascript variable that will contain the File object of the uploaded file. The File will have properties: name, size, lastModified (in ms), type and **data**. The **data** property contains the deserialized JSON. Seperated by a colon the javascript variable can be followed by the name of a transform function in case the loaded file is not in JSON format. The transform function can then tranform the text into a javascript object. For example when the uploaded file is in xml or csv format. The transform will be provided with two arguments: the uploaded to deserialize string and the File object and should return the deserialized object.
    - Element **select** has a **change** listener and takes a string.

    Here an example where the javascript variable myNumber is bound to a number input control. _&lt;input type="number" data-value="myNumber">_
- **data-style**: Update the style attribute with an evaluated template string. _&lt;div data-style="width:${widthVar}"/>_ 
- **data-attr-[attr]** Dynamically set any of the HTML element's attribute value. Update that attribute with an evaluated template string. _&lt;img data-attr-width="${imgWidth}">_ updates the element's width attribute. If the attribute is a boolean attribute, for example disabled or readonly, the value with be evaluated as a boolean and if true the attribute will be set.
- **data-class**: Takes a classname and an boolean expression, separated by a colon that resolves in adding the classname when the expression is true and removes it when it resolves to false. If no boolean expression is provided the classname (is also assumed to be an existing javascript variable which will be resolved into a boolean expression. _&lt;div data-class="myClass:x>0">_ or _&lt;div data-class="booleanClass">_
- **data-if**: Takes a boolean expression, when true the element is shown, when false the element is hidden (by setting display:none). Instead of using just a boolean expression, a classname prefixing the boolean expression seperated by a colon can be specified. ie myclassname:booleanexpression. In this case the element will not be hidden using display:none but when the expression is true the classname is added and when false removed. This allows for classbased hiding/showing of the element including any animations that are driven of the class. _&lt;div data-if="x>0">_ or _&lt;div data-if="myClass:x>0">_ 
- **data-for**: Takes a var name separated by a colon and followed by an iterating javascript iterable object or a number. The first child of the element containing data-for will be replicated with the number of the elements in the iterable object or the number of times specifed. All elements contained by the element with the data-for property have access to a property index and with an iterable object the item property on the var variable. Nested loops a are allowed. For example  _&lt;data-for="vrb:10">_ or _&lt;data-for="vrb:myarray">_.
The variable vrb will contain the propery **index** and when bound to an array also the property **item**. For example:
&lt;ul data-for="vrb:_array">&lt;li data-text=${vrb.index} - ${vrb.item}> will render the index and the value of the array for each element in the array.
- **data-action**: javascript code that gets executed in the event. In the code snippet you have access to the event details through the e variable.
- **data-on-<eventname>**: takes javascript code that gets executed in the event. In the code snippet you have access to the variable the event details through the e variable.
- **data-rest**: Takes a javascript variable and a rest service JSON endpoint url, separated by a colon. Once the rest service call is resolved the javascript variable contains the object representing the json. An optional property path in the resultset can be specified. When the url changes the rest call gets executed again. The url is an evaluated template string. That is how you can parameterize your rest calls. Based on the state of the rest call various classes are added on the element containing the data-rest attribute. When the rest call is in progress it adds the **reken-rest-busy** class. When completed it adds the **reken-rest-done** class. When there was an error it contains a **reken-rest-error** class. This allows you to change the look of the UI during the various stages. 
An example is _&lt;tbody data-rest="myArray:myrestfile.json"/>_ for a file coming from the same domain. Or _&lt;div data-rest="myObject:path.to.the.object:http://someserver/thathasarestapi.json">_
- **data-rest-options**: Takes a javascript object with properties to set on the Fetch call initiated by the data-rest attribute.
- **data-calc**: Set this on a script tag that needs to be excuted everytime there is a model update. Use for example to recalculate formulas or make transformations of data loaded by a rest service. For example _&lt;script data-calc>myVar = myOtherVar + 10&lt;/script>_
- **data-component**: You can create a reusable component by adding a data-component attribute to a template. The value of the attribute is the name of the component. You can now reuse this component in your document by adding the data-component attribute to a non-template tag. It will then insert/replace the content of that tag with the content of the template. For example _&lt;template data-component="mycomponent"> .... html here ...&lt;/template>_ You can reuse the component by refering to it as follows: _&lt;div data-component="mycomponent">&lt;/div>_
You can create component specific styles, by placing a style tag in the template for the component definition. You can refer to the top element with the :host css phrase.
_&lt;style>
  :host {background: red;}
  :host > span {color: white;}
&lt;/style>_
You can also specify component state by specifying a script tag and initialize variables with the let construct. For example _let val = 100_ This _val variable will be scoped to the component.
- **data-arg-***: You can pass in arguments into a component using the data-arg-&lt;name> attribute. For example: _&lt;div data-component="mycomponent" data-arg-myattr="value">_. In the component definition you will need to specify the attribute and can then use it in the component definition.  _&lt;template data-component="mycomponent" data-arg-myattr>..._  You can now refer to the attribute in the template html. For example: _&lt;div data-text="${myattr}" which insert the argument as the div's text content.
- **data-bind-***: You can create bind variables to a component's bindable arguments using the data-bind-&lt;name> attribute. For example: _&lt;div data-component="mycomponent" data-bind-myattr="myVar">_. In the component definition you will need to specify the attribute and can then use it in the component definition.  _&lt;template data-component="mycomponent" data-bind-myattr>..._  You can now refer to the attribute in the template html, if the attribute gets updated in the component, the variable that is bind to it will also automatically update.

Look at the demos and the Reken REPL for more examples and usages. 

# Acknowledgments
## [MVP.css](https://andybrewer.github.io/mvp/)
A semantic HTML stylesheet. Create good looking and concise demos.
## [Chart.css](https://chartscss.org)
A CSS data visualization framework. Used in the chart demo.
## [Mocha](https://mochajs.org)
Runs the Reken tests.
## [Chai](https://www.chaijs.com)
Assertions in the Reken tests.
## [Chai-dom](https://www.chaijs.com/plugins/chai-dom/)
DOM Assertions in the Reken tests.

# License
Distributed under the MIT license. See License for details.




