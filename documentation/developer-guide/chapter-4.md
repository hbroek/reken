

# Chapter 4: Reken Attribute Reference

This chapter will dive deeper into Reken's attributes and explore their functionality. These attributes provide the building blocks for creating dynamic and interactive web pages. Understanding how each attribute works and how to use them effectively is crucial for harnessing the power of Reken.

## 4.1 data-text

**Syntax:**

**`data-text`="[template string]"**

The `data-text` attribute allows you to update the `textContent` of an HTML element with an evaluated template string. This attribute is commonly used for rendering dynamic text content. The syntax of the template string is compatible with the javascript template string expressions. 

**Example:**
```html
<p data-text="Hello, ${userName}!"></p>
```

In this example, the text content of the `<p>` element will be updated with the value of the `userName` JavaScript variable.

>**Note:** Since `data-text` is updating the HTML Element's `textContent`, It is considered a **safe** DOM update, even when using untrusted data.*

>*Warning: Any (text/HTML) content of the HTML element with the `data-text` attribute is overridden.*

**Example:**
```html
<p data-text="Hello, I win">This will be overridden by the data-text's expression</p>

<p data-text="Hello, I win as well">This text will be overriden as well, but the child elements stay
 <h1>
  <span>Child elements are not overriden.</span>
 </h1>
</p>
```

## 4.2 data-html

**Syntax:**

**`data-html`="[template string]"**

The `data-html` attribute enables you to update the `innerHTML` of an HTML element with an evaluated template string. It's useful when you want to inject dynamic HTML content into an element. The syntax of the template string is compatible with the javascript template string expressions. 

**Example:**
```html
<div data-html="<em>${empVar}</em> - <span>${descVar}</span>"></div>
```

Here, the `<div>` element's content will be replaced with the HTML content generated with the `empVar` and `descVar` variables.


>*Warning: Since `data-html` is updating the HTML Element's `innerHTML`, it is considered a **UNSAFE** DOM update. Use with caution!*

>*Warning: Any (text/HTML) content of the HTML element with the `data-html` attribute is overridden* 

**Example:**
```html
<div data-html="<h1>Hello, I win</h1>">This will be overridden by the data-text's expression</div>

<div data-html="<h1>Hello, I win as well</h1>">
 <h1>
  <span>the h1 and span tags will be overridden by the data-html's expression as well.</span>
 </h1>
</div>
```


## 4.3 data-value

**Syntax:**

**`data-value`="[variable name]"**


The `data-value` attribute is used for binding a JavaScript variable to an input element, creating two-way data binding. It supports various input types, such as text, number, checkbox, radio, file, and more. The event used to update the bind value is the `change` event, except for input type `range` and `textarea` which use the `input` event. 


### 4.3.1 type='text'

With input types `text` and similarly `search`, `email`, `password`, `tel` and `url` all bind to a string. They differ in that they have some validation and/or additional affordances on the control.

When using the `data-value` attribute the javascript string value will be applied to the input control and when the value is changed in the input control, the variable gets updated.

**Example:**

```html
<input type="text" data-value="userName"/>
```

Likewise with the input type number field, but instead of binding a string value, we bind a integer or number value. The input control typically has additional affordance to increment or decrement the value.

### 4.3.2 type='number'

**Example:**

```html
<input type="number" data-value="age"/>
```

When the user interacts with the input field, the `age` variable will be updated automatically, and changes to the variable will be reflected in the input field.

### 4.3.3 type='date'

With input types `text` and similarly `datetime-local`, `month`, `time`, and `week` all bind to a string representing date and/or time. They differ in that they have some validation and/or additional affordances on the control.

>**Note:** It is important to initialize the variable with a string value that is compatible with the date format that is expected.

**Example:**

```html
<input type="date" data-value="birthday"/>
```

When the user interacts with the input field, the `birthday` variable will be updated automatically, and changes to the variable will reflect in the input field.

### 4.3.4 type='color'

Input type `color` binds to a string representing the hex value of a color.

>**Note:** It is important to initialize the variable with a string value that is empty or a six-digit RGB hex-value preceded with a `#`. i.e. `#762828`


**Example:**

```html
<input type="color" data-value="favoriteColor"/>
```

When the user interacts with the input field, the `favoriteColor` variable will be updated automatically, and changes to the variable will be reflected in the input field.

### 4.3.5 type='range'

Input type `range` binds to an integer variable. As mentioned earlier, when binding a variable to a `type=range` input control, the variable gets updated through an `input event`. This means that user manipulates the range control (typically via slider control), and the bound variable updates instantly. Not when he finishes. The advantage is that the UI can react to the updating variable in real time.


**Example:**

```html
<input type="range" data-value="age"/>
```

When the user moves the slider with the input field, the `age` variable will be updated automatically, and changes to the variable will be reflected in the input field.

### 4.3.6 type='radio'

A radio input control works in concert with other radio input controls, which are grouped by the same `name` attribute (a set). The function of the radio controls is to have the user select one of the values. By clicking an unselected value, it is selected, and the previously selected value is deselected. To bind the set of radio controls to a javascript value, specify on each of the radio controls a `data-value` with the same variable name.

**Example:**

```html
<input type="radio" name="gender" value="female" data-value="genderValue"/>
<input type="radio" name="gender" value="male" data-value="genderValue"/>
<input type="radio" name="gender" value="other" data-value="genderValue"/>
```

When the user selects one of the radio controls, the `genderValue` variable will be updated automatically with the `value` specified in the control, and changes to the variable will be represented by the appropriate radio control being checked.

### 4.3.7 type='checkbox'

The checkbox input control can be bound in two ways.

First, similar to the radio input control, the checkbox can work in concert with other checkbox input controls grouped by the same `name` attribute (a set). The function of the checkbox controls is to have the user select zero, one, or more of the values.

**Example:**

```html
<input type="checkbox" name="allergies" value="nuts" data-value="allergyValues"/>
<input type="checkbox" name="allergies" value="dust" data-value="allergyValues"/>
<input type="checkbox" name="allergies" value="bees" data-value="allergyValues"/>
```
When the user selects one or more of the checkboxes, the `allergyValues` variable will be updated automatically with the values specified in the controls by an array, and changes to the variable array will be represented by the appropriate checkboxes being checked.

Second, the checkbox can work by itself (i.e,. no `name` attribute). In this case, its `data-value` is bound to a `boolean` variable.

**Example:**

```html
<input type="checkbox" data-value="vegetarianValue"/>
```

When the user selects the checkbox, the `vegetarianValue` variable will be automatically set to `true`, and when unchecked, set to `false`. Changes to the boolean variable will either check or uncheck the checkbox depending on the boolean value it is set to.

### 4.3.8 type='file'

Input type `file` data binding works a slightly differently than the other input controls. It is not a 2-way binding. It is a 1-way binding. The user picks a file, and then the binding variable gets updated with a File object. The File object will contain at least a `data` property which is the object representation of the JSON string that is loaded.

When the user chooses a file, the `fileObject` variable will be updated with information about the file. It will be populated with the following properties:

* `name`: name of the file.
* `lastModified`: date the file was last modified.
* `size`: the size of the file.
* `data`: the object representing the JSON from the file.

By default, the `type=file` input control data binding assumes the loaded file is a valid `JSON` representation. If it is not, you can specify a reference to a transformer function in the `data-value` attribute. 

**Example:**

```html
<input type="file" data-value="fileObject:csvConverter" accept=".csv">
```

After the user selects a CSV file the csvConverter function is called with the arguments: `content` and `fileObject`; the csvConverter function should return a javascript object or array representing the CSV content.

**Example:**

```javascript
/* Simple csv to array of objects converter */
function csvConverter(contentText, fileObject) {
  return contentText.split('\n')
    .map((csvRow)=>csvRow.split(',')
      .reduce((obj, field, index)=>{obj['f'+index]=field;return obj}, {}));
}
```

### 4.3.9 textarea

By binding a value to the textarea control, the string variable gets updated in realtime. 

**Example:**

```html
<textarea data-value="comment"></textarea>
```

When the user interacts with the textarea field, the `comment` variable will be updated in real time, and changes to the variable will be reflected in the input field.

### 4.3.10 select

When a variable is bound to a `select` element, the variable will get populated with the value of the option the user picks.

**Example:**

```html
<select data-value="genderValue">
 <option value="male">Male</option>
 <option value="female">Female</option>
 <option value="other">Other</option>
</select>    
```
In this example, the `data-value` attribute is set on a `select` element with the javascript variable `genderValue`. When the user picks one of the three values from the `option` tags, it will be reflected in the `genderValue` attribute.

## 4.4 data-style

**Syntax:**

**`data-style`="[template string]"**

With the `data-style` attribute, you can update the `style` attribute of an element using an evaluated template string. This is particularly helpful for dynamically modifying CSS styles.

**Example:**

```html
<div data-style="width:${width}px;height:${height}px;background;lightgreen"></div>
```

In this example, the width and height of the `<div>` element will be set based on the value of the `width` JavaScript variable. The background is set with a regular style setting.

## 4.5 data-attr-[attr]

**Syntax:**

**`data-attr-[attrName]`="[template string] | [boolean expression]"**

The `data-attr-[attr]` attribute allows you to set any HTML element’s attribute value dynamically. You can update the attribute with a template string.

**Example:**

```html
<img data-attr-src="img/${imageUrl}" width="120"/>
```

Here, the `src` attribute of the `<img>` element will be set to the value of the `imageUrl` JavaScript variable. We set the width of the image to 120 pixels.

Boolean HTML attributes such as `disabled`, `readonly` etc should be bound to a boolean variable.

**Example:**

```html
<button data-attr-disabled="isDisabled">Click</button>
```

When the `isDisabled` variable is true, then the `disabled` HTML attribute is set on the `button` component, preventing the user from clicking it.

## 4.6 data-class

**Syntax:**

**`data-class`="[classname](:[boolean expression])"**

The `data-class` attribute adds or removes CSS classes based on a boolean expression. A colon separates it, and the class is applied when the expression is `true` and removed when `false`.

**Example:**

```html
<div data-class="highlight:grade>7">John Smith</div>
```

The `highlight` class will be added to the `<div>` element when the `grade` variable is larger than 7.

You can add multiple class expressions in one `data-class` by separating them with a semicolon.

**Example:**

```html
<div data-class="bolded:isBold;cursive:isCursive">...</div>
```

The `bolded` class will be added to the `<div>` element when the `isBold` variable is `true`, and the `cursive` class is added when the `isCursive` variable is true.

There is also a short form for defining `data-class` expressions. To define this specify a boolean variable name. The class will have the same name as the variable.

**Example:**

```html
<div data-class="halted">...</div>
```

The `halted` class will be added to the `<div>` element when the `halted` javascript variable is `true`.


## 4.7 data-if

**Syntax:**

**`data-if`="([classname]:)[boolean expression]"**

The `data-if` attribute is used for conditional rendering. It shows or hides an element based on a boolean expression. When an element is hidden with a false boolean expression, all of its descendant elements are hidden, and their Reken attributes are not executed as either.

**Example:**

```html
<div data-if="isLoggedIn">Logged In</div>
```

The `<div>` element will only be displayed if the `isLoggedIn` variable is `true`.

A class name preceding the expression can be provided to control how an element is shown.

**Example:**

```html
<div data-if="fadein:isActive" class="hidden">is Active</div>
```

The `<div>` element has a class 'hidden' to display it off screen. The `data-if` adds a class `fadeIn` when the `isActive` variable is `true`, animating the element in view.

>**Note:** It is the developer's responsibility to indicate that the `div` is inactive. All the descendant elements with `Reken` attributes are inactive too. Even if they may be visible.

## 4.8 data-for

**Syntax:**

**`data-for`="[iteratorVariable]:[integer]|[iterable object]:(endIndex)|(startIndex:endIndex)"**

The `data-for` attribute is used for creating repeating elements. It takes a variable name, followed by a colon, and an iterable JavaScript object or a number. All children of the element are replicated according to the iterable object's length or the specified number.

**Example:**

```html
<div data-for="vrb:5">
 <span>*</span>
</div>
```

This example generates five spans, each containing an asterix.

During iteration, the variable name contains a property `index`. With the `index` property, you have access to a zero-based index of the current element.

**Example:**

```html
<div data-for="vrb:5">
 <span data-text="${vrb.index}"></span>
</div>
```

In this example, we are using the variable's `index` property to set the text with the current index number of the `span`,

When an array is specified to iterate over, the iterator variable also contains an `item` property that contains the current array element.

**Example:**

```html
<script>const fruits = ['apple', 'orange', 'peach']</script>
<ul data-for="fruit:fruits">Fruits
 <li data-text="${fruit.item}"></li>
</ul>
```

In this example, we are using the the `fruit` variable's `item` property to set the current array value on the `li`,

Elements with `data-for` can be nested, creating nested loops.

**Example:**

```html
<script>
 const movies = [
  { name: 'Lord of the Rings', rating: 5 },
  { name: 'Harry Potter', rating: 2 },
  { name: 'Avatar', rating: 4 }
 ]
</script>
...
<section data-for="movie:movies">
 <div>
  <h1 data-text="${movie.item.name}"></h1>
  <div data-for="tomato:movie.item.rating">
   <span>*</span>
  </div>
 </div>
</section>
```

In this example, we use the iterator variable `movie`'s `item` property to create an `h1` element with the movie name. A second loop uses the `rating` property to render the number of stars.

When the `data-for` attribute has an optional 3rd parameter endIndex specified, it will stop the for-loop at that position.

when a 3rd and 4th parameter is specified. The 3rd argument is the startIndex, and the 4th argument is the endIndex. In this case, there is also an `itemIndex` property available on the `iteratorVariable`. It represents the actual array index.

**Example:**

```html
<script>
const insects = [
 'butterfly',
 'spider',
 'lady bug',
 'mosquito',
 'fly',
 'tick',
]
</script>
...
<ol data-for="insect:insects:3">Insects
 <li data-text="${insect.item}"></li>
</ol>
```
In this example above, we only show a maximum of 3 li's based on the more extended insects array. 

**Example:**

```html
<script>
const pictures = [
 '10001.jpg',
 '10020.jpg',
 '10003.jpg',
 '10017.jpg',
 '10006.jpg',
 '10013.jpg',
 '10009.jpg',
 '10011.jpg',
]
let firstPicture = 0;
</script>
...
<section data-for="picture:pictures:firstPicture:firstPicture+3">
 <img
 data-attr-src="photos/${picture.item}"
 data-attr-alt="Picture ${picture.itemIndex}"
 width="200"
/>
</section>
<button type="button"
 data-action="firstPicture=firstPicture-1;"
 data-attr-disabled="firstPicture==0"
>Prev</button>
<button type="button"
 data-action="firstPicture=firstPicture+1;"
 data-attr-disabled="firstPicture==pictures.length-3"
>Next</button>
```
In this example, we show three pictures at a time from the pictures array. With the Next and Prev buttons, we scroll through the pictures. When the end or beginning of the array is reached, the appropriate buttons are disabled.

## 4.9 data-action

**Syntax:**

**`data-action`="[code to execute]"**

The `data-action` attribute allows you to execute JavaScript code responding to a click event. Basically, it is a convenience wrapper around a native `click` event handler, which also invokes the `Reken` model to execute.

**Example:**

```javascript
<script>
let counter = 0;
</script>
```

```html
<button data-action="counter=counter+1">Increment</button>
<output data-text="${counter}"></output>
```

When the button is clicked, the `counter` variable is increased by `1`. The `output` Element is updated with the new `counter` value. 

You can access the native event details through the `e` variable in the event handling code. With the event object methods such as `stopPropagation` and `preventDefault`, the flow of the event can be changed.

**Example:**

```html
<button data-action="console.log(e);e.preventDefault();">Log Event Object</button>
```

After the button is clicked, the native click event is logged on the console. The default click behavior is prevented with the `preventDefault` call.

## 4.10 data-on-

**Syntax:**

**`data-on-[event]`="[code to execute]"**

The `data-on-` attribute is similar to `data-action` but is used for executing JavaScript code in response to any native event. Identical to the `data-action` attribute, the `e` variable provides access to the event details.

**Example:**

```javascript
<script>
let x = y = 0;
</script>
```

```html
<div
 data-on-mousemove="x=e.clientX;y=e.clientY"
 style="width:200px;height:200px;background:pink;"
>Hover mouse over square
</div>
<output data-text="${x},${y}"></output>
```

This code updates the `x` and `y` variables with the `clientX` and `clientY` properties from the `mousemove` event when mousing over the red `div` square. The `output` element text content gets updated with the new values;

Like with `data-action`, the event flow can be controlled by calling `preventDefault` and/or `stopPropagation`.

**Example:**

```html
<div data-on-click="console.log('div')">
 <a href="https://www.reken.dev"
  data-on-click="console.log('a href'); e.stopPropagation();e.preventDefault();">
  Click here !
 </a>
</div>
```

This example displays a message on the console when the link is clicked. The call to `preventDefault` prevents the link from being followed. And the call to `stopPropagation` stops the click on the div to be triggered. 

## 4.11 data-timer

**Syntax:**

**`data-timer`="[time in ms]:[start/stop boolean expression]:[code to execute]"**

The `data-timer` attribute allows you to execute JavaScript code after a specified time. It has three parts: the time in milliseconds, a boolean expression to trigger the timer, and the code to execute.

**Example:**

```javascript
let isActive = false;
```
```html
<div data-if="isActive">Message is displayed for 2 seconds.</div>
<button
  data-timer="2000:isActive:isActive=false"
  data-action="isActive=true;">
  Start Message
</button>
```

This code will display the "Message is displayed" `div` for two seconds after the user clicks the "Show Message" `button`. The `button` timer gets started once the `isActive` boolean is set to true. After 2 seconds, the timer executes the code to set the `isActive` boolean to `false`, and the `div` is hidden per its `data-if` attribute,

>**Note** if the boolean trigger expression is still true when the timer is executed, it will start a new timer. The timer can be interrupted by setting the boolean trigger expression to `false`.

## 4.12 data-interval

**Syntax:**

**`data-interval`="[time in ms]:[start/stop boolean expression]:[code to execute]"**

Similar to `data-timer`, the `data-interval` attribute allows you to execute code at regular intervals. It includes the interval time, a boolean expression to start/stop the intervals, and the code to execute.

**Example:**

```javascript
let isRunning = false;
let counter = 0;
```

```html
<div data-interval="1000:isRunning:counter++;" data-text="${counter}"></div>
<button data-action="isRunning=!isRunning;" data-text="${isRunning?'Stop':'Start'}"></button>
```

After the user clicks the "Start" button, the counter will increment every second, represented by the `div` element being updated. The text of the `button` will change to "stop". When the user clicks the "Stop" `button`, the counter will stop.

## 4.13 data-rest

**Syntax:**

**`data-rest`="[variable]:(objectProperty:)[rest template string url]"**

The `data-rest` attribute is used to fetch data from a REST API `url` endpoint and stores it in the JavaScript variable `variable`. It supports parameterization of the endpoint URL and handles the API call automatically by parsing the returned JSON. Specifying an optional `object property` path, a subset of the object can load into the `variable`.

**Example:**

```javascript
let userData = {}
```

```html
<div data-rest="userData:json/person.json"></div>
<output data-text="Name: ${userData.name}"></output>    
```

In this example, data is fetched from `json/person.json` and stored in the `userData` variable.

When only a subset of the object is needed, an optional object path as the 2nd parameter can be provided.

**Example:**

```json
// person.json
{
  "name": "Johny Walker",
  "address": {
    "street": "42 Liquor Rd",
    "city": "Whiskey Town",
    "state": "Kentucky"
  } 
}
```

```javascript
let addressData = {}
```

```html
<div data-rest="addressData:address:/api/person.json"></div>
<output data-text="Street: $(addressData.street}"></output>
<output data-text="City: $(addressData.city}"></output>
<output data-text="State: $(addressData.state}"></output>
```

The REST call populates the `addressData` variable with the `address` subtree from the JSON file. As a result the expressions to get the address data can just specify `addressData.propName` instead of `addressData.address.propName`

When the data load initiated by a `data-rest` attribute is in progress, or finished the element containing the `data-rest` attributes gets updated with status classes:

* `reken-rest-busy` - while a REST call is in progress.
* `reken-rest-done` - after the call has finished successfully
* `reken-rest-error` after the call finished unsuccessfully.

```css
<style>
.reken-rest-busy {
 background: silver;
}
.reken-rest-done {
 background: light-green;
}
.reken-rest-error {
 background: pink;
}
</style>
```

In this example, we show how one could style the Reken Rest status classes. When the data is loading(`data-rest-busy`) the background of the element that contains the `data-rest` attribute displays with a gray background. It displays green (`reken-rest-done`) when it was successful and pink (`reken-rest-error`) when it failed.

## 4.14 data-rest-options

**Syntax:**

**`data-rest-options`="[object variable]"**

The `data-rest-options` attribute allows you to specify options for the Fetch call initiated by the `data-rest` attribute. Note these options are passed into the underlying REST Fetch call. The following options can be set:

* `fetch` - a boolean, when set to true, forces the REST call to execute again.
* all the fetch call options; for example: `method` or `headers`

**Example:**

```javascript
let orderData = {
  customerNumber: 12345,
  products : [
    {id: '3456', amount: 8},
    {id: '5673', amount: 3},
  ]
};
let fetchOptions = {
  fetch: false,
  method: 'POST',
}
let orderResult;

```

```html
<div data-rest="orderResult:/api/orders" data-rest-options="fetchOptions">
 <button data-action="fetchOptions.body=JSON.stringify(orderData);fetchOptions.fetch=true;">Order</button>
</div>
```

In this example, we set up a REST call to `/api/orders` and have the result put in the variable `orderResult`.

We also specify the REST call options with the variable `fetchOptions`. At the start, they have the properties: `fetch` and `method`.

With `fetch` being `false` means not to execute the fetch call yet. And with the `method` set to `POST` means if the call gets executed, use `POST` instead of the default `GET` method.

When the "Order" `button` is pressed, we add a `body` property with the order content and set the `fetch` property to `true` to force the REST call.

It then returns the result of the order API call in the `orderResult` variable. It also resets the `fetch` property to false;

For more control over the results of the REST call, use the options properties:

* `reken_rest_status`: this contains the value `reken-rest-busy` while a REST call is in progress. When the REST call is finished successfully, it contains: `reken-rest-done` and when finished unsuccessful, it contains the value `reken-rest-error`.
* `callback`: when this contains a function reference, it gets called when the REST call finishes. It will pass in 2 arguments: the options object and the initialized JSON object that got loaded when successful.
* `reviver`: If this function reference property is specified, it will do a callback on each loaded object property with the name of the property and the value and return a transformed or untransformed value. This is useful when recreating, for example, Date objects from a JSON Date string.

**Example:**

```javascript
<script>
  let message = 'Loading...'
  let statusOptions = {
      callback: (options, json_object) => {
          message = (options.reken_rest_status==='reken-rest-done' ?
              `Successful; Loaded ${json_object.length} orders` : 
              `Unsuccessful: errorcode: ${options.response.status}-${options.response.statusText}`)
      },
      reviver: (prop_name, prop_value) =>
          prop_name === 'created'?new Date(prop_value):prop_value
  }
  let orders;
</script>
```

```html
<body>
    <main data-rest="orders:array.json" data-rest-options="fetchOptions" >
        <div data-for="order:orders">
            <div data-text="${order.item.id} - ${order.item.created.toDateString()}"></div>
        </div>
    </main>
    <footer data-text="${message}"></footer>
</body>
```

In this example, we set the callback property on the REST options to update the `message` variable when and how the REST call succeeded. 

To convert the `created` values in the JSON file, a reviver property is set with a function that converts all JSDN date strings into Dates but leaves all the other fields untouched.


## 4.15 data-calc

**Syntax:**

**`data-calc`**

The `data-calc` attribute is used to mark a script to have its contents executed everytime there is a model update. It helps recalculate formulas or transform data loaded by a REST service.

**Example:**

```javascript
<script>
let fahrenheit = 0;
</script>

<script data-calc>
let celsius = (fahrenheit - 32) * 5 / 9;
</script>
```

```html
<label>Fahrenheit:
  <input data-value="fahrenheit" type="range" min="0" max="140"/>
  <output data-text="${fahrenheit}"></output>
</label>
<hr/>
<label>Celsius:
  <output data-text="${celsius.toFixed(1)}"></output>
</label>
```
In this example the user can choose a value in the Fahrenheit `input range` control, resulting in an updated `fahrenheit` variable. The input control change triggers a model update, which recalculates the `celsius` variable. The updated `celsius` value updates the output control Element's textContent via the `data-text` attribute.

## 4.16 data-route

**Syntax:**

**`data-route`="([classname]:)[routename]([#variable]\)"**


The `data-route` attribute shows or hides parts of a page based on the URL hash. It's handy for creating single-page applications (SPAs) with different views.

A route can also reference a variable by preceding it with a #. In this way, parameterized URLs can be created.

### 4.16.1 Basic routing

**Example:**

```html
<main data-route="">
 <h1>Default page</h1>
</main>
<main data-route="page1">
 <h1>Page 1</h1>
</main>
<main data-route="page2">
 <h1>Page 2</h1>
</main>
<main data-route="page3">
 <h1>Page 3</h1>
</main>
<nav>
 <a href="#/">[ Default ]</a>
 <a href="#/page1">[ 1 ]</a>
 <a href="#/page2">[ 2 ]</a>
 <a href="#/page3">[ 3 ]</a>
</nav>
```

In this example, we define four pages with the `main` tag. With its `data-route` attribute, we specify the hash to access the page. With an empty `data-route` attribute we set a default page that gets shown when there is no or empty hash on the url.

In the `nav`, tag we specify four links to navigate to a specific page. The URL to navigate to a route page consists of the `data-route` value preceded by `#/`

>**Note:** Not that inactive pages are not processed in the UI update cycle.

### 4.16.2 Routing with a class

Like the `data-if` attribute, the `data-route` value can be proceeded by a class name. When a class name is specified, the page is not hidden/shown, but the class is added to the page which is currently routed. This can be useful to animate pages in view.

**Example:**

```html
<style>
  .active {
    background: green;
    color: white;
  }
</style>
```

```html
<main data-route="active:">
 <h1>Default page</h1>
</main>
<main data-route="active:page1">
 <h1>Page 1</h1>
</main>
<main data-route="active:page2">
 <h1>Page 2</h1>
</main>
<main data-route="active:page3">
 <h1>Page 3</h1>
</main>
<nav>
 <a href="#/">[ Default ]</a>
 <a href="#/page1">[ 1 ]</a>
 <a href="#/page2">[ 2 ]</a>
 <a href="#/page3">[ 3 ]</a>
</nav>
```

This example is similar to the previous one, except now, each `data-route` value has the 'active' classname specified.

When the user now routes to the page with that route name, the class `active` is added to the `main` element of the active route. The style class definition for the `active` class makes the background green and the font color white.

### 4.16.3 Routing with parameters,

To create a parameterized page, create a variable containing the parameter value and include it preceded by a hash in the `data-route` attribute.

**Example:**

```javascript
let orderNumber;
```

```html
<main data-route="#orderNumber">
 <label>Order number:
  <output data-text="${orderNumber}"></output>
 </label>
</main>
<ul data-for="iVar:5">Orders:
 <li>
  <a
   data-attr-href="#/${iVar.index+1000}"
   data-text="${iVar.index+1000}">
  </a>
 </li>
</ul>
```

In this example, we create a `main` element that shows an `output` tag that displays the value of the `orderNumber` variable. The example also creates a list of order numbers with links with the `data-for` and `data-attr-href` and `data-text` attributes. When the user clicks on one of the order number links, the page URL gets updated, and the `output` tag displays the selected order number.

## 4.17 data-component

**Syntax definition:**

**`<template data-component="[component name]">`**

**Syntax reference:**

**`<div data-component="[component name]"></div`**

**or**

**`<component-name></component-name>`**

The `data-component` attribute allows you to create reusable components. You define a component in a `template` tag with an attribute `data-component` specifying the name of the component.

A component can then be referenced in a tag referencing the component name using the `data-component` attribute or the component name as a tag.


**Example:**

```html
<html>
<body>
  <hello-world></hello-world>
  or
  <div data-component="hello-world"></div>
</body>
<template data-component="hello-world">
  <div>Hello <b>World</b></div>
</template>
</html>
```

In this example, we define a hello component with a template. The component is named **hello-world** with the template's `data-component` attribute. The content contained by the `template` tag is the actual component. In this case, it contains the text "Hello" followed by a bold tag containing "World".

We can now reference the component with the `hello` tag or an element containing a `data-component` attribute with the value "hello".

>**Note:**
A component can have only **one** HTML Element as a top-level element in a component definition.

**`<slot>`**
Variable content in the component can be specified with the `slot` tag. Any content defined in the `slot` tag will be used as default content.

**Example:**

```html
<html>
<body>
  <hello>John</hello>
  or
  <div data-component="hello"></div>
</body>
<template data-component="hello">
 <div>Hello 
  <b>
   <slot>World</slot>
  </b>
 </div>
</template>
</html>
```

In this example, we create a component called `hello`. It defines a `slot` in the `template`. The `hello` component is referenced twice with both reference syntaxes. The first reference specifies `John` as the slot content. The second reference does not specify `slot` content and, as a result, displays the default `slot` content of `World`.

## 4.18 data-arg-*

**Syntax definition:**

**`<template data-arg-[attribute name](="default value")>`**

**Syntax reference:**

**`<custom-component data-arg-[attribute-name]="[template text|variable]"></custom-component`**

**or**

**`<custom-component attribute-name="[template text|variable]"></custom-component`**

With the `data-arg-*` attribute, a read-only custom component attribute can be defined. A default value can be initialized by specifying a value on the custom component attribute.

An attribute on a custom component can be set by specifying the `data-arg-[component-attribute]=value` or the short form with `component-attribute=value`.

**Example:**

```html
<html>
<body>
 green box
 <color-box data-arg-color="green"></color-box>

 blue box
 <color-box color="blue"></color-box>

 or box with the default color red
 <color-box></color-box>
</body>

<template data-component="color-box" data-arg-color="red">
 <div data-style="background:${color};width:100px;height:100px;">
 </div>
</template>
</html>
```
In this example, we create a `color-box` component with the dimensions 100px by 100px, which has an attribute `color`, that sets background color. The default color is red.

In the example, the `color-box` component is referenced three times. First, with a color **green**, then **blue**, and lastly, without specifying a color, which displays the default color **red**.

Besides string literals, the argument values can also be specified as template strings. 

**Example:**

```javascript
<script>
  let red = 125;
  let green = 20;
  let blue = 200;
</script>
```

```html
<html>
<body>
 <color-box color="rgb(${redColor},${greenColor},${blue})"></color-box>
 <fieldset style="display:flex"><legend>RGB color picker</legend>
  <label>Red:<input type="range" min="0" max="255" data-value="red"/></label>
  <label>Green:<input type="range" min="0" max="255" data-value="green"/></label>
  <label>Blue:<input type="range" min="0" max="255" data-value="blue"/></label>
 </fieldset>
</body>
<template data-component="color-box" data-arg-color="red">
 <div data-style="background:${color};width:100px;height:100px;">
 </div>
</template>
</html>
```
In this example we use the same `color-box` component as in the previous example. But now we pass in a template string that constructs an `RGB` color definition. The RGB colors are based on the `red`, `green`, and `blue` javascript variables. The example also defines a range input control for each color. With these controls, the user can tweak the color displayed in the `color-box` component.

Lastly, a variable can be passed into as an attribute variable. This variable must exist during the Reken initialization phase of the page; if it does not, it will be considered a string literal.

**Example:**

```javascript
<script>
  let hexColorValue = '#FF0000';
</script>
```

```html
<html>
<body>
<color-box color="hexColorValue"></color-box>
 <label>Red:<input type="color" data-value="hexColorValue"/></label>
</body>
<template data-component="color-box" data-arg-color="red">
 <div data-style="background:${color};width:100px;height:100px;">
 </div>
</template>
</html>
```

In this example, we pass in the javascript variable `hexColorValue` into the `color` attribute of the `color-box` component. In the example, the color input control allows the user to change the `hexColorValue`.

## 4.19 data-bind-*

**Syntax definition:**

**`<template data-bind-[attribute name]></template>`**

**Syntax reference:**

**`<custom-component data-bind-[attribute-name]="[variable]"></custom-component`**

**or**

**`<custom-component attribute-name="[variable]"></custom-component`**

With the `data-bind-*` attribute, a custom component bindable attribute can be defined. With a bindable attribute, a custom component can modify the variable's value.

A bindable attribute on a custom component can be set by specifying the `data-bind-[component-attribute]=value` or the short form with `component-attribute=value`.

s**Example:**

```javascript
<script>
  let chosenColor = '';
</script>
```
```html
<html>
<body>
 <color-chooser color="chosenColor"></color-chooser>
 <hr/>
 <label>Color:
  <output data-text="${chosenColor}"></output>
 </label>
</body>

<template data-component="color-chooser" data-bind-color>
  <div style="display:flex; gap:0.25em;">
    <color-button color="blue" pickedcolor="color"></color-button>
    <color-button color="green" pickedcolor="color"></color-button>
    <color-button color="red" pickedcolor="color"></color-button>
  </div>
</template>

<template data-component="color-button" data-arg-color data-bind-pickedcolor>
  <button
    type="button"
    data-style="background-color:${color};color:white;"
    data-text="${color}" data-action="pickedcolor=color">
  </button>
</template>

</html>
```
In this example, we create two components: `color-button` and `color-chooser`.

`color-button` has an argument that takes the color the `color-button` represents. It also has a `pickedColor` bindable attribute, which updates with the `color-button`'s color when the button is pressed.

The `color-chooser` component has a `chosen-color` bindable attribute. It is set on the `pickedColor` bindable attribute of the `color-button`. There are three `color-button`s declared in the `choosen-color` component. When one of the buttons is pressed, the `choosenColor` variable, which is bound to the `color` bindable attribute on the `color-chooser`, gets updated, and the `output` gets updated.

## 4.20 data-include

**Syntax:**

**`<div data-include="[html url]"></div>`**

The `data-include` attribute allows you to import external HTML files into your document, making it easier to manage Reken component libraries and common HTML fragments.

**Example:**

```html
<html>
<body>
 <hello></hello>
 <goodbye></goodbye>
</body>
<div data-include="./sectioncomponents.html"></div>
</html>
```

```html
<!--components.html-->
<template data-component="hello">
  <h1>Hello!</h1>
</template>
<template data-component="goodbye">
  <h1>Goodbye!</h1>
</template>
```

In this example, we create a component.html file. It contains the component definitions of the `hello` and `goodbye` components.

The main HTML code loads the **components.html** file with the `data-include` attribute and references the `hello` and `goodbye` components with the shorthand notation `<hello>` and `<goodbye>` tags.

## 4.21 data-ref

**Syntax:**

**`data-ref="javascript variable"`**

The `data-ref` attribute is used to specify a variable name to which Reken assigns the element reference of the attribute's HTML element. This is useful for working with specific elements, such as setting focus or using third-party libraries that need object references.

**Example:**

```javascript
<script>
let buttonRef;
</script>
```
```html
<body>
 <button data-ref="buttonRef"
  data-action="console.log(buttonRef)">
  Press to log reference
 </button>
</body>
```

In this example, the `data-ref` attribute is specified with the `buttonRef` variable. When the user clicks the button, it logs the reference to the HTML button in the console.


In this chapter, we've provided a comprehensive reference for Reken's attributes, explaining their functions and how to use them effectively in your web development projects. These attributes offer a wide range of functionality for creating dynamic and interactive web pages. Understanding when and how to use them is key to harnessing Reken's full potential.