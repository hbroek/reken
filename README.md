# ![Reken logo; blue html representing elements intertwined with orange reken elements](/assets/reken-logo.png)

**Reken** _Dutch singular verb for calculate. Pronounce: **Ray - ken**_

**With Reken you can create fast, reactive, HTML compliant web pages without virtual DOM overhead or the need for build tools.**

For live demos, REPL and more information, visit the [Reken website](http://www.reken.dev).

## Why use Reken?

### Easy creation of Dynamic Web pages with just HTML, CSS and a few  sprinkles of Javascript.
- Build dynamic DOM based standard HTML with a few Reken HTML attributes.
- No need to learn new markup such as JSX or TSX.
- Just 1 DOM tree, without the need for Virtual DOM trees.
- Reken only updates DOM that needs changing.
- No need to install any tooling.
- ES6 Based. (Sorry no IE).
- HTML compliant web pages.
- Can hydrate search engine friendly server side generated content.

### Who is Reken for?
- HTML page developers, that need some interactivity.
- UX designers, that want to make their UI mockups come alive
- Developers looking to build a quick prototype or minimal viable product.
- Web app builders building light-weight apps.

### How does Reken work?
Reken relies on a few `data-*` attributes that empower any HTML element to:
- Render dynamic content, attributes and styles.
- Conditional renders or toggles classes.
- Create repeating HTML such as selections, lists or tables.
- Makes it real easy to accept and process user input through events.
- Loads from a JSON REST endpoint and provides classes to monitor the rest call status.
- Automatically updates the DOM.

When a page with Reken attributes is loaded, Reken will build a setup controller and a runtime controller.

It will then run the setup controller once to register any event listeners.

After setup is completed it will run the runtime controller which will update any dynamic DOM when needed. The runtime controller will run again after any Reken-managed event listener fires or rest call finishes.

## Example

```html
<script>
    let name = 'World';
</script>

<h1 data-text="Hello ${name}"></h1>
```

## Installation
Install Reken.js on your server and add a script tag **at the bottom of your web page** between the the end body and before the end html tag.

```html
<html>
  <body></body>
  <script src="reken.js"></script>
</html>
```

## Browser support
Reken relies on a number of ES6 features and therefor supports the following browsers:

- Chrome
- Safari
- Firefox
- Chrome Edge

## Attribute API
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
- **data-class**: Takes a classname and an boolean expression, separated by a colon that resolves in adding the classname when the expression is true and removes it when it resolves to false. If no boolean expression is provided the classname (is also assumed to be an existing javascript variable which will be resolved into a boolean expression. _&lt;div data-class="myClass:x>0">_ or _&lt;div data-class="booleanClass">_. You can provide more classes on one HTML element to be manipulated by seperating them with a semicolon. _&lt;div data-class="myClass:x>0;booleanClass;yourClass:y<0">_
- **data-if**: Takes a boolean expression, when true the element is shown, when false the element is hidden (by setting display:none). Instead of using just a boolean expression, a classname prefixing the boolean expression seperated by a colon can be specified. ie myclassname:booleanexpression. In this case the element will not be hidden using display:none but when the expression is true the classname is added and when false removed. This allows for classbased hiding/showing of the element including any animations that are driven of the class. _&lt;div data-if="x>0">_ or _&lt;div data-if="myClass:x>0">_ 
- **data-for**: Takes a var name separated by a colon and followed by an iterating javascript iterable object or a number. All the children of the element contained by the data-for element will be replicated with the number of the elements in the iterable object or the number of times specifed. All elements contained by the element with the data-for property have access to a property index and with an iterable object the item property on the var variable. Nested loops a are allowed. For example  _&lt;data-for="vrb:10">_ or _&lt;data-for="vrb:myarray">_.
The variable vrb will contain the propery **index** and when bound to an array also the property **item**. For example:
&lt;ul data-for="vrb:_array">&lt;li data-text=${vrb.index} - ${vrb.item}> will render the index and the value of the array for each element in the array. An optional 3rd integer end parameter lets the for loop continue until it reaches the end value. When a 4th integer end value is specified the loop starts at the begin value which is in this case the third parameter and end at the 4th parameters. For example _&lt;data-for="vrb:10:end">_ or _&lt;data-for="vrb:myarray:start:end">_
- **data-action**: javascript code that gets executed in the event. In the code snippet you have access to the event details through the e variable.
- **data-on-<eventname>**: takes javascript code that gets executed in the event. In the code snippet you have access to the variable the event details through the e variable.
- **data-timer**: javascript code that gets executed after a specified time. The data-timer value consists of 3 parts separated by colons. First the time after the code gets triggered (in ms). Second a boolean expression. When true the timer will start. Note if the expression turns false before the timer is triggered the code will NOT execute. And third the code to execute. For example _&lt;div data-timer="500:startTimer:console.log('timer is done');startTimer=false"/>_ This code will print "timer is done" after 500ms when startTimer becomes true. And since the timer sets the boolean to false, will not start another timer again. 
- **data-interval**: javascript code that gets executed after a specified interval time. Like with the data-timer, the data-interval value consists of 3 parts separated by colons. First the interval each time the code gets triggered (in ms). Second a boolean expression. When true the intervals will start. Note if the expression turns false the intervals will stop. And third the code to execute. For example _&lt;div data-interval="300:startInterval:console.log('Another 300ms interval passed')/>_ This code will print "Another 300ms interval passed" every 300ms when startInterval becomes true.
- **data-rest**: Takes a javascript variable and a rest service JSON endpoint url, separated by a colon. Once the rest service call is resolved the javascript variable contains the object representing the json. An optional property path in the resultset can be specified. When the url changes the rest call gets executed again. The url is an evaluated template string. That is how you can parameterize your rest calls.
  - Based on the state of the rest call various classes are added on the element containing the data-rest attribute. When the rest call is in progress it adds the **reken-rest-busy** class. When completed it adds the **reken-rest-done** class. When there was an error it contains a **reken-rest-error** class. This allows you to change the look of the UI during the various stages. An example is _&lt;tbody data-rest="myArray:myrestfile.json"/>_ for a file coming from the same domain. Or _&lt;div data-rest="myObject:path.to.the.object:http://someserver/thathasarestapi.json">_ 
  **data-rest-options**: Takes a javascript object with properties to set on the Fetch call initiated by the data-rest attribute.
  - Rest options also takes a **fetch** property when that is true the fetch call will get executed. When the Rest call is executed the fetch property will be reset to false. When the fetch option is set. Reken will no longer monitor the url and therefor will not longer execute the fetch when the url changed.
  - In case the text file coming from the Rest endpoint is not a JSON file. You can specify a transformer function with the **transformer** property, that gets called once the fetch completes. In the transformer function the text file can be transformed into an object. For example when loading a CSV or XML file. The transformer function gets 2 arguments: First argument is the string to be transformed and the 2nd argument is the options object. The transform function needs to return the object.
  - The options object will contain the response object of the latest executed fetch request under the **response** property.
  - Besides the response object, the options object will also contain a property reken_rest_status. It can have the following three values, which are the same as the status class names mentioned earlier under `data-rest`: `reken-rest-busy`, `reken-rest-done` and `reken-rest-error`.
  - When the `callback` property that contains a function reference is specified, it will be called when the REST call finishes (successful or unsuccessful). Two arguments are passed in: `options` and when succesful; the initialized `json object`.
  - To do some field transformations a reviver property can be set that gets executed to convert property values. For example to convert a JSON date string to Date object. The function will be called with 2 arguments. The property name and the property value, it should return the transformed or if no transformation is needed the untransformed value.
- **data-calc**: When set on a script tag that needs to be executed everytime there is a model update. Use for example to recalculate formulas or make transformations of data loaded by a rest service. For example _&lt;script data-calc>myVar = myOtherVar + 10&lt;/script>_. When set on regular HTML you can specify code to run in the attribute value. The code will execute every time the controller runs. For example _&lt;input data-calc="if (elem != document.activeElement) elem.focus()_. This will focus the element when it does not have focus. Note the **elem** variable which is available and points to the element the data-calc property is assigned to. **Use with care this code runs everytime the controller runs**.
- **data-route**: With the data-route attribute you can turn parts of the page on and off based on the url hash. This is useful for SPA applications that have all the pages in one HTML document. For example you can show a signup page, the login page, a main page with url hashes: **#/signup, #/login, #/main**. The route attribute on the element for the signup page would in this case be **"data-route="/signup"**.
  - You can also specify a classname to be used instead of showing / hiding the element. For example **data-route="fade-in-signup:/signup"** will set the class fade-in-signup on the element when the url hash matches the route. This allows the use of CSS animations to hide and show the element.
  - Route attributes can also be set on nested elements that match sub elements. For example an element with route **"/main"** can contain an element with a sub route **"welcome"** and an element with a subroute **"goodbye"** showing either of the 2 sub elements depending whether the url hash is **"/main/welcome"** or **"/main/goodbye"**.
  - Reken's routing  supports routing variables to parameterize a routing page. With **/order/#orderid**, the element with the order route is made visible and a variable called **orderid** is initialzed with the 2nd argument. For example a hash **/order/12345**. Activates the element with the order route and sets the orderid routing variable with the value **12345**. This is useful in master details usecases. For example open a new page with the order selected or a sub view on the same page is initialized with the orderid number.
  - To navigate thru the application you can create links with **&lt;a href="#/main/welcome"&gt;Welcome&lt;/a&gt;**
  - A back button can be implemented by using the history API. **&lt;button data-action="history.back()"&gt;Back&lt;/button&gt;**
- **data-component**: You can create a reusable component by adding a data-component attribute to a template. The value of the attribute is the name of the component. You can now reuse this component in your document by adding the data-component attribute to a non-template tag. It will then insert/replace the content of that tag with the content of the template. For example _&lt;template data-component="mycomponent"> .... html here ...&lt;/template>_ You can reuse the component by refering to it as follows: _&lt;div data-component="mycomponent">&lt;/div>_
You can create component specific styles, by placing a style tag in the template for the component definition. You can refer to the top element with the :host css phrase.
_&lt;style>
  :host {background: red;}
  :host > span {color: white;}
&lt;/style>_
You can also specify component state by specifying a script tag and initialize variables with the let construct. For example _let val = 100_ This _val variable will be scoped to the component.
  - Component tags can be used in a shorthand form as well. The mycomponent component above can be written as _&lt;mycomponent >&lt;/mycomponent>_
  - Components support slots. Slots allow you to transfer markup from the component reference into the body of a component definition. Take for example a new button component with the template: _&lt;button data-component="my-button">My &lt;slot>&lt;slot>&lt;button>_. You can now create a my-button with  _&lt;my-button>click me&lt;my-button&lt;button>. This will result into a button with the text: _My click me_  
- **data-arg-***: You can pass in arguments into a component using the data-arg-&lt;name> attribute. For example: _&lt;div data-component="mycomponent" data-arg-myattr="value">_. In the component definition you will need to specify the attribute and can then use it in the component definition.  _&lt;template data-component="mycomponent" data-arg-myattr>..._  You can now refer to the attribute in the template html. For example: _&lt;div data-text="${myattr}" which insert the argument as the div's text content.
  - When using the shorthand reference to a component one can ignore data-arg for the arguments. The example above would become: _&lt;mycomponent myattr="100">..._
- **data-bind-***: You can create bind variables to a component's bindable arguments using the data-bind-&lt;name> attribute. For example: _&lt;div data-component="mycomponent" data-bind-myattr="myVar">_. In the component definition you will need to specify the attribute and can then use it in the component definition.  _&lt;template data-component="mycomponent" data-bind-myattr>..._  You can now refer to the attribute in the template html, if the attribute gets updated in the component, the variable that is bind to it will also automatically update.
  - When using the shorthand reference to a component one can ignore data-bind for the arguments. The example above would become: _&lt;mycomponent myattr="myvar">..._
- **data-include**: Include an external HTML file into the HTML document with the data-include element. This allows you to import a component library or import commonly used HTML fragments like a header and/or a footer. The syntax is: _&lt;div data-include="mylibrary.html">_. It also support subfolders such as: _&lt;div data-include="includes/mylibrary.html">_. Included files themselves may include other HTML files. Note use wisely as the more includes the longer it takes for a page to render.
- **data-ref**: With the data-ref attribute, you can specify the variable name Reken will assign the element reference of the attribute's HTMLElement. For example _&lt;input data-ref="inputControl"/>._ The already declared variables _inputControl_ will refer to the input control HTMLElement. Your javascript code can now access its properties and methods. Note, when applying Reken correctly, there should only be a few use cases to do this. Some are: setting/checking focus on an element or working with 3rd-party libraries that need a reference to an HTML element.

Look at the demos and the Reken REPL for more examples and usages. 

## JavaScript API

On the global namespace you can find the `reken` object. 

It has the following public members:
- **version** property; The Reken version number
- **force_calculate** function; Force reken to run its model and update the UI. Normally this happens automatically when using Reken events. However if you have, for example, promises resolving that are not initiated by Reken, you can call `reken.force_calculate()`.
- **forceCalculate** function; Deprecated. See `force_calculate`.


## Acknowledgments

- [**MVP.css**](https://andybrewer.github.io/mvp/): A semantic HTML stylesheet. Create good looking and concise demos.
- [**Chart.css**](https://chartscss.org): A CSS data visualization framework. Used in the chart demo.
- [**Mocha**](https://mochajs.org): Runs the Reken test suite.
- [**Chai**](https://www.chaijs.com): This is used for assertions in the Reken test suite.
- [**Chai-dom**](https://www.chaijs.com/plugins/chai-dom/): DOM Assertions in the Reken tests.

## License
Distributed under the MIT license. See [the License file](./LICENSE) for details.
