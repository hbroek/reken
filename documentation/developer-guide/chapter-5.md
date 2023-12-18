

# Chapter 5: Advanced Features

In this chapter, we'll explore some of the more advanced features of Reken that enable you to create complex and interactive web applications. These features enhance your ability to build dynamic and engaging user interfaces.

## 5.1 Data Binding

Reken supports data binding, allowing you to update components based on changes in variables or user interactions.

**Data Binding:**
```html
<input data-value="userInput"/>
<output data-text="${userInput}"></output>
```

In this example, any changes made in the input field are automatically reflected in the `<output>`.

## 5.2 Component Creation and Usage

Components are a powerful way to modularize and reuse parts of your web application's user interface. With Reken, you can create custom components and easily include them in your pages. This promotes code reusability and maintainability.

**Creating a Component:**

1. Define a component within a `<template>` element using the `data-component` attribute, specifying component's name.

```html
<template data-component="my-component">
 <!-- Your component's HTML structure -->
 <button data-action="console.log('Button clicked!')">Click me</button>
</template>
```

2. In your document, reference the component using the `data-component` attribute on an HTML element.

```html
<div data-component="my-component"></div>
```
Alternatively, you can reference the component using the shorthand by referencing the component by its tag.

```html
<my-component></my-component>
```

The content of the component's template will replace the element's content with the `data-component` attribute.


## 5.3 Using Components and Slots

Components in Reken can be customized with slots. Slots are placeholders in component templates where you can insert content from the component reference. This allows you to create more flexible and configurable components.

**Creating a Component with Slots:**

1. Define a component with a slot within its template.

```html
<template data-component="my-button">
 <button><slot>A Button</slot></button>
</template>
```

2. Use the component; the content provided within the reference will replace the `<slot>` element.

```html
<my-button>Click me</my-button>
```

In this example, "Click me" will replace the `<slot>`, making the component customizable.

```html
<my-button></my-button>
```

When no content is provided, the `<slot>` content is used. This provides a fallback in case no content is provided.

## 5.4 Component State

Reken supports component state management, allowing you to store changes in local variables.

**Component State:**
```html
<template data-component="counter">
 <script>
  let count = 0;
 </script>
 <div>
  <button data-action="count++">
   Increment
  </button>
  <p data-text="Count: ${count}"></p>
 </div>
</template>
```

In this example, the `counter` component maintains its state with a `count` variable, updated when the "Increment" button is clicked.

## 5.5 Passing Data in Components

Components can be configured by passing in arguments with the `data-arg-*` attribute; in this way, components can be customized without having to create a new component.

```html
<body>
 <color-button color="red">RED</color-button>
 <color-button color="gold">GOLD</color-button>
 <color-button></color-button>
</body>
<template data-component="color-button"
 data-arg-color="skyblue">
 <button data-style="background:${color}">
  <slot>Default</slot>
 </button>
</template>
```

This example defines a `color-button` button component that can be configured to set the background color with the `color` attribute. It has a default background of skyblue. In this example, three buttons are created. One with a red background and one gold with the `color` attribute specified. The last uses the default background color skyblue as it has no color attribute set.

## 5.6 Getting data out of components

Components can pass data outside of the component with the data-bind-* attribute. When a JavaScript variable is bound via a data-bind attribute, the component can change the variable's value.

```html
<html>
<script>
 let currentNote = ''
</script>
<body>
 <notes note="currentNote"></notes>
 <output data-text="Current note: ${currentNote}"></output>
</body>
<template data-component="notes" data-bind-note="">
<script>
 let notes = "CDEFGABC"
</script>
 <nav data-for="n:notes">
  <button data-text="${n.item}" data-action="note=n.item">
  </button>
 </nav>
</template>
<script src="https://cdn.jsdelivr.net/gh/hbroek/reken@latest/dist/reken.min.js"></script>
</html>
```

In this example, we create a musical notes component. It displays a button for each note. When a note's button is pressed, the note is displayed via the bound and updated `currentNote` variable.

## 5.7 Component Events

Reken allows your components to create custom events. You can fire an event by calling function `dispatch`, with the mandatory event type argument and an optional details argument. When the event is initiated, the listeners will receive an event (`e`) with a `detail` property that contains the contents of the second argument.

```html
<!DOCTYPE html>
<html>
<body>
 <keypad data-on-pin="alert(e.detail)"></keypad>
</body>
<template data-component="keypad" data-bind-note="">
 <nav style="display:grid;
  grid-template-columns: 3rem 3rem 3rem;
  grid-template-rows: 3rem 3rem 3rem;" 
  data-for="n:9">
  <button data-text="${n.index+1}"
   data-action="dispatch('pin', n.index+1)">
  </button>
 </nav>
</template>
```

In this example, a keypad component is defined. When a button is pressed, an event with a payload containing the keypad number is dispatched. The keypad has an event listener that shows an alert with the contents of the `detail` property, the key pressed.

## 5.8 Component Styling

Reken supports component styling, allowing you to style a component without affecting the styles of elements not part of the component.

```html
<head>
  <style>
    div {
      background: red;
      color:white;
    }
    div > span {
      background-color: purple;
    }

  </style>
</head>
<body>
  <div>
    This background is red.
    <my-style>This is green</my-style>
    <span>This should be purple</span>
  </div>
</body>
<template data-component="my-style">
  <style>
    :host {
      background: green;
    }
    :host > span {
      background: blue;
    }
  </style>
  <div>
    <span>Here follows the slot text:</span>
    <slot></slot>
  </div>
</template>
```

In this example, the `my-style` component defines two styles with the `:host` style selector. The first style rule declares that the whole component has a green background. The second style rule specifies that all spans in the my-style component have a blue background. Notice that these style rules override page-level style rules without affecting the elements not part of the component.

## 5.9 Component Modules

Reken supports component modules. It can include external component definitions and HTML fragments from other HTML files. Includes can be nested as well. However it is not recommended to have too many separate/nested modules.

**Component includes:**
```html
 <ok-button></ok-button>
</body>
<div data-include="lib/components.html"></div>
```

```html
</body> <!-- components.html -->
<div data-include="buttons.html"></div>
<!-- ... include other sub libraries. -->
```

```html
<!-- buttons.html -->
<template data-component="primary-button">
 <button style="background:skyblue"><slot>Default</slot></button>
</template>
<template data-component="ok-button">
<span>
 <primary-button>Ok</primary-button>
</span>
</template>
<template data-component="cancel-button">
<span>
 <primary-button>Cancel</primary-button>
</span>
</template>
```

In this example, the main HTML page loads the `components.html` file with the `data-include` attribute. The `components.html`, in addition, loads other sub-component files, such as `buttons.html`, with the `data-include` attribute.

## 5.10 Routing with Reken

Routing is essential for building single-page applications (SPAs) with multiple views or pages in a single HTML document. Reken provides a flexible way to implement routing based on URL hashes.

**Basic Routing:**

1. Define a route by specifying a URL hash in the `data-route` attribute.

```html
<div data-route="/home">This is the Home page</div>
<div data-route="/about">This is the About page</div>
```

2. Create links to navigate through your application.

```html
<a href="#/home">Home</a>
<a href="#/about">About</a>
```

3. When the URL hash matches a defined route, the associated content will be displayed, and other content will be hidden.

Reken can also be configured to create parameterized routes. This is useful for data-driven pages such as the details page based on a ID. A parameterized route can be defined be preceding the route name with a `#`. Reken will then try to map the route name to a variable with the same name.

**Parameterized Routing:**

1. Define a route by specifying a URL hash preceded by a `#` in the `data-route` attribute.

```html
<div data-route="/products/#productId">This is the product detail page</div>
```

2. Create an array with our product catalog and create the links to navigate to them.

```javascript
const products = [
  {'id': 'p12345', 'name': 'Product 12345'},
  {'id': 'p67890', 'name': 'Product 67890'},
];
let productId;
```

```html
<ul data-for="product:products"> <!-- Dynamic routing-->
  <li>
    <a href="#/products/${product.item.id}"
      data-text="${product.item.name}"></a>
  </li>
</ul>
```

3. When the URL hash matches a defined route, the associated content will be displayed and the variable productId is populated with the selected product id.

These advanced features expand the capabilities of Reken, allowing you to create complex and interactive web applications. Whether you need to build reusable components, implement routing, handle events, or manage component state, Reken provides the tools to do so effectively.