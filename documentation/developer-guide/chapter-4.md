# DRAFT - Chapter 4: Reken Attribute Reference

In this chapter, we'll dive deeper into Reken's attributes and explore their functionality. These attributes provide the building blocks for creating dynamic and interactive web pages. Understanding how each attribute works and how to use them effectively is crucial for harnessing the power of Reken.

## 4.1 `data-text`
**Syntax:**
**`data-text`="[template string]"**

The `data-text` attribute allows you to update the `textContent` of an HTML element with an evaluated template string. This attribute is commonly used for rendering dynamic text content. The syntax of the template string is compatible with the javascript template string expressions. 

**Example:**
```html
<p data-text="Hello, ${userName}!"></p>
```

In this example, the text content of the `<p>` element will be updated with the value of the `userName` JavaScript variable.

Since `data-text` is updating the HTML Element's `textContent`, It is considered a **safe** DOM update, even when using untrusted data.

*Note: Any (text/HTML) content of the HTML element with the `data-text` attribute is overriden*

**Example:**
```html
<p data-text="Hello, I win">This will be overriden by the data-text's expression</p>

<p data-text="Hello, I win as well">
  <h1>
    <span>the h1 and span tags will be overriden by the data-text's expression as well.</span>
  </h1>
</p>
```


## 4.2 `data-html`
**Syntax:**
**`data-html`="[template string]"**

The `data-html` attribute enables you to update the `innerHTML` of an HTML element with an evaluated template string. It's useful when you want to inject dynamic HTML content into an element. The syntax of the template string is compatible with the javascript template string expressions. 

**Example:**
```html
<div data-html="<em>${empVar}</em><span>${descVar}</span>"></div>
```

Here, the `<div>` element's content will be replaced with the HTML content generated with the `empVar` and `descVar` variables.


Since `data-html` is updating the HTML Element's `innerHTML`, it is considered a **UNSAFE** DOM update. Use with caution!

*Note: Any (text/HTML) content of the HTML element with the `data-html` attribute is overriden* 

**Example:**
```html
<p data-html="<h1>Hello, I win</h1>">This will be overriden by the data-text's expression</p>

<p data-html="<h1>Hello, I win as well</h1>">
  <h1>
    <span>the h1 and span tags will be overriden by the data-text's expression as well.</span>
  </h1>
</p>
```


## 4.3 `data-value`
**Syntax:**
**`data-value`="[variable name]"**


The `data-value` attribute is used for binding a JavaScript variable to an input element, creating two-way data binding. It supports various input types, such as text, number, checkbox, radio, file, and more. The event used to update the bind value is the `change` event, except for input type `range` and `textarea` which use the `input` event. 


### 4.3.1 `type='text'`

With input types `text` and similarly `search`, `email`, `password`, `tel` and `url` all bind to a string. They differ in that they have some validation and/or additional affordances on the control.

When using the `data-value` attribute the javascript string value will be applied to the input control and when the value is changed in the input control, the variable gets updated.

**Example:**
```html

<input type="number" data-value="userName">
```

Likewise with the input type number field, but instead of binding a string value, we bind a integer or number value. The input control typically has additional affordance to increment or decrement the value.

### 4.3.2 `type='number'`

**Example:**
```html
<input type="number" data-value="age">
```

When the user interacts with the input field, the `age` variable will be updated automatically, and changes to the variable will reflect in the input field.

### 4.3.3 `type='date'`

With input types `text` and similarly `datetime-local`, `month`, `time`, and `week` all bind to a string representing date and/or time. They differ in that they have some validation and/or additional affordances on the control. Note is is important to initialize the variable with a string value that is compatible to the date format that is expected.


**Example:**
```html
<input type="date" data-value="birthday">
```

When the user interacts with the input field, the `birthday` variable will be updated automatically, and changes to the variable will reflect in the input field.

### 4.3.4 `type='color'`

Input type `color` binds to a string representing hex value of a color. Note it is important to initialize the variable with a string value that is empty or also a six digit RGB hex-value preceded with a `#`. i.e. `#762828`


**Example:**
```html
<input type="color" data-value="favoriteColor">
```

When the user interacts with the input field, the `favoriteColor` variable will be updated automatically, and changes to the variable will reflect in the input field.

### 4.3.5 `type='range'`

Input type `range` binds to a integer variable. As mentioned earlier when binding a variable to a `type=range` input control, the variable gets updated through a `input event`. Which means that user manipulates the range control (typically via slider control)  the bound variable updates instantly. Not when he finishes. The advantage is that the UI can react in realtime to the updating variable.


**Example:**
```html
<input type="range" data-value="age">
```

When the user move the slider with the input field, the `age` variable will be updated automatically, and changes to the variable will reflect in the input field.

### 4.3.6 `type='radio'`

A radio input control works in concert with other radio input controls, which are grouped together by the same `name` attribute (a set). The function of the radio controls is to have the user select one of the values. By clicking an unselected value it is selected, and the previously selected value is deselected. To bind the set of radio controls to a javascript value, specify on each of the radio control with a `data-value` with the same variable name.

**Example:**
```html
<input type="radio" name="gender" value="female" data-value="genderValue"/>
<input type="radio" name="gender" value="male" data-value="genderValue"/>
<input type="radio" name="gender" value="other" data-value="genderValue"/>
```

When the user selects one of radio controls, the `genderValue` variable will be updated automatically with the `value` specified in the control, and changes to the variable will be represented by the appropriate radio control being checked.

### 4.3.6 `type='checkbox'`

The checkbox input control can be bound in two ways.

First, similar to the radio input control, the checkbox can work in concert with other checkbox input controls,  grouped together by the same `name` attribute (a set). The function of the checkbox controls is to have the user select zero, one, or more of the values.

**Example:**
```html
<input type="checkbox" name="allergies" value="nuts" data-value="allergyValues"/>
<input type="checkbox" name="allergies" value="dust" data-value="allergyValues"/>
<input type="checkbox" name="allergies" value="bees" data-value="allergyValues"/>
```
When the user selects one or more of the checkboxes, the `allergyValues` variable will be updated automatically with the values specified in the controls by an array, and changes to the variable array will be represented by the appropriate checkboxes being checked.

Second, the checkbox can work by itself (ie no `name` attribute). In this case its `data-value` is bound to a `boolean` variable.

**Example:**
```html
<input type="checkbox" data-value="vegetarianValue"/>
```

When the user selects the checkbox, the `vegetarianValue` variable will be automatically set to `true` and when unchecked set to `false`. Changes to the boolean variable will either check or uncheck the checkbox depending on the boolean value it is set to.

### 4.3.8 `type='file'`

Input type `file` data binding works a little different than the other input controls. It is not a 2-way binding. It is a 1-way binding. The user picks a file and then the binding variable gets updated with a File object. The File object will contain at least a `data` property wich is the object representation of the JSON string that is loaded.

**Example:**
```html
<input type="file" data-value="fileObject" accept=".json">
```

When the user chooses a file, the `fileObject` variable will be updated with information about the file. It will be populated with the following properties:
- `name`: name of the file.
- `lastModified`: date the file was last modified.
- `size`: the size of the file.
- `data`: the object representing the JSON from the file.

By default the `type=file` input control data binding assumes the file that is loaded is a valid `JSON` representation. If it is not you can specify a reference to a transformer function in the `data-value` attribute. 

**Example:**
```html
<input type="file" data-value="fileObject:csvConverter" accept=".csv">
```

After the user selected a CSV file the csvConverter function is called with the arguments: `content` and `fileObject`, the csvConverter function should return a javscript object or array representing the CSV content.

**Example:**
```javascript
/* Naive csv to array of objects converter */
function csvConverter(contentText, fileObject) {
  return contentText.split('\n')
    .map((csvRow)=>csvRow.split(',')
      .reduce((obj, field, index)=>{obj['f'+index]=field;return obj}, {}));
}
```
### 4.3.9 `textarea`

By binding a value to the textarea control the string variable gets updated in realtime. 

**Example:**
```html
<textarea data-value="comment"></textarea>
```

When the user interacts with the textarea field, the `comment` variable will be updated in realtime, and changes to the variable will reflect in the input field.

## 4.4 `data-style`
**Syntax:**
**`data-style`="[template string]"**

With the `data-style` attribute, you can update the `style` attribute of an element using an evaluated template string. This is particularly helpful for dynamically modifying CSS styles.

**Example:**
```html
<div data-style="width:${width}px;height:${height}px"></div>
```

In this example, the width and height of the `<div>` element will be set based on the value of the `width` JavaScript variable.

## 4.5 `data-attr-[attr]`
**Syntax:**
**`data-attr-[attrName]`="[template string] | [boolean expression]"**

The `data-attr-[attr]` attribute allows you to dynamically set any HTML element's attribute value. You can update the attribute with a template string.

**Example:**
```html
<img data-attr-src="${imageUrl}">
```

Here, the `src` attribute of the `<img>` element will be set to the value of the `imageUrl` JavaScript variable.

Boolean HTML attributes such as `disabled`, `readonly` etc should be bound to a boolean variable.

**Example:**
```html
<input type="text" data-attr-disabled="${isDisabled}">
```

When the `isDisabled` variable is true than the `disabled` HTML attribute is set on the `input` component, preventing the user from interacting with it.



## 4.6 `data-class`
**Syntax:**
**`data-class`="[classname](:[boolean expression])"**

The `data-class` attribute is used to add or remove CSS classes based on a boolean expression. It is separated by a colon, and the class is applied when the expression is `true` and removed when it's `false`.

**Example:**
```html
<div data-class="highlight:grade>8">...</div>
```

The `highlight` class will be added to the `<div>` element when the `grade` variable is larger than 8.

You can add multiple class expressions in one `data-class` by seperating them with a semicolon.

**Example:**
```html
<div data-class="bolded:isBold;cursive:isCursive">...</div>
```

The `bolded` class will be added to the `<div>` element when the `isBold` variable is `true`, and the `cursive` class is added when the `isCursive` variable is true.

There is also a shortform for defining `data-class` expressions. To define this just specify specify a boolean variable name. The class will have the same name as the variable.

```html
<div data-class="halted">...</div>
```

The `halted` class will be added to the `<div>` element when the `halted` javascript variable is `true`.


## 4.7 `data-if`
**Syntax:**
**`data-if`="([classname]:)[boolean expression]"**

The `data-if` attribute is used for conditional rendering. It shows or hides an element based on a boolean expression. When an element is hidden with a false boolean expression, none of the descendant elements attributes are off course hidden as well, but their Reken attributes are not executed as well.

**Example:**
```html
<div data-if="isLoggedIn">...</div>
```

The `<div>` element will only be displayed if the `isLoggedIn` variable is `true`.

To control how an element is shown, a class name preceding the expression can be provided. 

**Example:**
```html
<div data-if="fadein:isActive">...</div>
```

The `<div>` element will have a class `fadeIn` when the `isActive` variable is `true`. Note it is the developer's responsibility to indicate that the `div` is inactive. All the descendant elements with `Reken` attributes are inactive too. Even if they they may be visible.

## 4.8 `data-for`
**Syntax:**
**`data-for`="[iteratorVariable]:[integer]|[iterable object]"**

The `data-for` attribute is used for creating repeating elements. It takes a variable name, followed by a colon, and an iterable JavaScript object or a number. All children of the element are replicated according to the iterable object's length or the specified number.

**Example:**
```html
<div data-for="vrb:5">
  <span class="star">⭐</li>
</div>
```

This example generates 5 spans each containing a star emoji.

During iterating the variable name contains a property `index`. With the `index` property you have access to index of the current element.

**Example:**
```html
<div data-for="vrb:5">
  <span data-text="${vrb.index}"></span>
</div>
```

In this example we are using the variable's `index` property to set the text with the current index number of the span`span`,

When an array is specified to iterate over, the iterator variable also contains an `item` property that contains the current array element.

**Example:**
```html
<script>let fruits = ['apple', 'orange', 'peach']</script>
<ul data-for="vrb:fruits">
  <li data-text="${vrb.item}"></li>
</ul>
```

In this example we are using the variable's `item` property to set the current array value on the `li`,

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
  <article>
    <h1 data-text="${movie.item.name}">
    </h1>
    <div data-for="tomato:movie.item.rating">
      <span>🍅</span>
    </div>
    </article>
</section>
```

In this example we are using the iterator variable `movie`'s `item` property to create an `h1` element with the movie name. A second loop is created that uses the `rating` property to render the number of tomatoes.


## 4.9 `data-action`
**Syntax:**
**`data-action`="[code to execute]"**

The `data-action` attribute allows you to execute JavaScript code in response to a click event. Basically it is a convenience wrapper around a native `click` event handler, which also invokes the `Reken` model to execute.

**Example:**
```javascript
<script>
let counter = 0;
</script>
```

```html
<button data-action="counter=counter+1">Increment</button>
<output data-text=${counter}></output>
```

When the button is clicked, the `counter` variable is increased by `1`. The `output` Element is updated with the new `counter` value. 

You have access to the native event details through the `e` variable in the event handling code. With the event object methods such as `stopPropagation` and `preventDefault` can be called to influence the flow of the event.

**Example:**
```html
<button data-action="console.log(e);e.preventDefault();">Log Event Object</button>
```

After the button is clicked, the native click event is logged on the console. The default click behavior is prevented with the `preventDefault` call.

## 4.10 `data-on-`
**Syntax:**
**`data-on-[event]`="[code to execute]"**

The `data-on-` attribute is similar to `data-action` but is used for executing JavaScript code in response to any native event. Similar to the `data-action` attribute the `e` variable provides access to the event details.

**Example:**
```javascript
<script>
let x = y = 0;
</script>
```

```html
<div data-on-mousemove="x=e.clientX;y=e.clientY" style="width:200px;height:200px;background:red;"></div>
<output data-text="${x},${y}"></output>
```

This code updates the `x` and `y` variables with the `clientX` and `clientY` properties from the `mousemove` event, when mousing over the red `div` square. The `output` element text content gets updated with the new values;

Like with `data-action` event flow can be controlled by calling `preventDefault` and/or `stopPropagation`.

```html
  <div data-on-click="console.log('div')">
    <a href="https://www.reken.dev"
      data-on-click="console.log('a href'); e.stopPropagation();e.preventDefault();">
      Click here !
    </a>
  </div>
```

This example displays a message on the console when the link is clicked. The call to `prevenDefault` prevents the link to be followed. And the call to `stopPropagation` stop the click on the div to be triggered. 

## 4.11 `data-timer`
**Syntax:**
**`data-timer`="[time in ms]:[start/stop boolean expression]:[code to execute]"**


The `data-timer` attribute allows you to execute JavaScript code after a specified time. It has three parts: the time in milliseconds, a boolean expression to trigger the timer, and the code to execute.

**Example:**
```javascript
let isActive = false;
```
```html
<div data-if="isActive">Message is displayed</div>
<button
  data-timer="5000:isActive:isActive=false"
  data-action="isActive=true;">Start Message
</button>
```

This code will display the "Message is displayed" `div` for five seconds after the user clicks the "Show Message" `button`. The `button` timer gets started once the `isActive` boolean is set to true. After 5 seconds the timer executes the code to set the `isActive` boolean to `false` and the `div` is hidden per its `data-if` attribute,

Note if the boolean trigger expression is still true when the timer is executed; it will start a new timer. The timer can be interrupted any time by setting the boolean trigger expression to `false`.

## 4.12 `data-interval`

**Syntax:**
**`data-interval`="[time in ms]:[start/stop boolean expression]:[code to execute]"**

Similar to `data-timer`, the `data-interval` attribute allows you to execute code at regular intervals. It includes the interval time, a boolean expression to start / stop the intervals, and the code to execute.

**Example:**
```javascript
let isRunning = false;
let counter = 0;
```

```html
<div data-interval="1000:isRunning:counter++;" data-text="${counter}"></div>
<button data-action="isRunning=!isRunning;" data-text="${isRunning?'Stop':'Start'}"></button>
```

After the user clicks the "Start" button the counter will increment every second, which will be represented by the `div` element being updated. The text of the `button` will change to "stop". When the user clicks the "Stop" `button` the counter will stop.

## 4.13 `data-rest`
**Syntax:**
**`data-rest`="[variable]:[template string url]"**


The `data-rest` attribute is used to fetch data from a REST API endpoint and store it in a JavaScript variable. It supports parameterization of the endpoint URL and handles the API call status.

**Example:**
```html
<div data-rest="userData:/api/user/123"></div>
```

In this example, data is fetched from `/api/user/123` and stored in the `userData` variable.

## 4.14 `data-rest-options`
**Syntax:**
**`data-rest-options`="[object variable]"**

The `data-rest-options` attribute allows you to specify options for the Fetch call initiated by the `data-rest` attribute. You can customize the REST request as needed.

## 4.15 `data-calc`
**Syntax:**
**`data-calc`**

The `data-calc` attribute is used to execute code every time there is a model update. It's helpful for recalculating formulas or making transformations to data loaded by a REST service.

## 4.16 `data-route`
**Syntax:**
**`data-route`="[routename]([#variable]\)"**


The `data-route` attribute is used to show or hide parts of a page based on the URL hash. It's particularly useful for creating single-page applications (SPAs) with different views.

## 4.17 `data-component`

The `data-component` attribute allows you to create reusable components. You define a component in a template and can then insert it into your document using the attribute. Components can include HTML, CSS, and even JavaScript state.

## 4.18 `data-arg-*` and `data-bind-*`

These attributes are used for

 passing arguments to components and binding variables to component attributes. They make it easy to create reusable and configurable components.

## 4.19 `data-include`

The `data-include` attribute allows you to import external HTML files into your document, making it easier to manage component libraries and common HTML fragments.

## 4.20 `data-ref`

The `data-ref` attribute is used to specify a variable name to which Reken assigns the element reference of the attribute's HTML element. This is useful for working with specific elements, such as setting focus or using third-party libraries.

In this chapter, we've provided a comprehensive reference for Reken's attributes, explaining their functions and how to use them effectively in your web development projects. These attributes offer a wide range of functionality for creating dynamic and interactive web pages. Understanding when and how to use them is key to harnessing the full potential of Reken.