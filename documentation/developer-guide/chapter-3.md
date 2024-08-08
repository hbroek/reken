

# Chapter 3: Basics

In this chapter, we'll cover the fundamental aspects of Reken, which will serve as the building blocks for creating dynamic and interactive web pages. You'll learn about Reken attributes, creating your first dynamic element, conditional rendering, handling user input, and working with REST APIs using Reken's powerful features.

## 3.1 Understanding Reken Attributes

Reken attributes are the essential features that empower HTML elements to become dynamic and responsive. These attributes offer a simple and efficient way to bind dynamic content, styles, and behaviors to your HTML elements without the need for complex JavaScript code. Let's explore the primary Reken attributes.

### 3.1.1 data-text

The `data-text` attribute is used to update an HTML element's `textContent` with an evaluated template string. It's a fundamental attribute for dynamically changing the text content of an element based on JavaScript variables.

**Example:**
```html
 <p data-text="Hello, ${name}"></p>
```

In this example, the content of the `p` element is dynamically updated to display a greeting such as "Hello, World!" using the value of the `name` JavaScript variable.

### 3.1.2 data-html

The `data-html` attribute allows you to update the `innerHTML` of an HTML element with an evaluated template string. It's a powerful tool for inserting dynamic HTML content into an element.

**Example:**
```html
 <div data-html="<em>${textToEmphasize}</em> and <strong>${strongText}</strong>"></div>
```

In this case, the `data-html` attribute dynamically inserts HTML content into the `div` element based on JavaScript variables `textToEmphasize` and `strongText`.

### 3.1.3 data-value

The `data-value` attribute is essential for binding a JavaScript variable to an input element, providing two-way data binding. It supports various input types, including text, number, checkbox, radio, and file.

**Example:**
```html
 <input type="text" data-value="userInput"/>
```

In this instance, the `data-value` attribute binds the `userInput` variable to a text input field, allowing the input to update the variable's value.

### 3.1.4 data-style

The `data-style` attribute is used to update the `style` attribute of an HTML element with an evaluated template string. It's a convenient feature for dynamically changing CSS styles based on JavaScript variables.

**Example:**
```html
 <button data-style="background-color: ${buttonColor}; color: ${buttonTextColor};">buttonText</button>
```

Here, the `data-style` attribute dynamically modifies the button's background and text colors based on JavaScript variables.

### 3.1.5 data-attr-[attr]

The `data-attr-[attr]` attribute dynamically sets the value of any HTML element's attribute using an evaluated template string. It's particularly useful for updating attribute values.

**Example:**
```html
 <button data-attr-title="${titleText}">I have a title</button>
```

In this example, the `data-attr-title` attribute dynamically modifies the `title` attribute of the `button` element based on the value of the `titleText` JavaScript variable.

These core Reken attributes are the foundation for creating dynamic web pages. As you progress through this chapter, you'll explore their usage in various scenarios.

## 3.2 Creating Your First Dynamic Element

Now that you have an understanding of Reken attributes, let's create your first dynamic element. We'll begin with a simple example using the `data-text` attribute to update the content of an HTML element.

### 3.2.1 Creating a Dynamic Greeting

Imagine you want to create a dynamic greeting that welcomes the user by their name. Follow these steps to create your first dynamic element:

**Step 1: Set up your HTML structure.**

```html
<!DOCTYPE html>
<html>
<head>
 <title>My Dynamic Greeting</title>
</head>
<body>
 <p data-text="Hello, ${name}"></p>
</body>
 <script></script>
 <script src="https://cdn.jsdelivr.net/gh/hbroek/reken@latest/dist/reken.min.js"></script>
</html>
```

In this example, we've established a basic HTML structure with a `p` element. The `data-text` attribute is utilized to insert a dynamic greeting.

**Step 2: Create JavaScript variables.**

Now, let's create JavaScript variables to store the dynamic data. You can include this script tag just before the closing `</body>` tag in your HTML document.

```html
<script>
 let name = 'Alice';
</script>
```

Here, we've defined the `name` variable with the value 'Alice'.

**Step 3: Import reken.js.**

```html
<!DOCTYPE html>
<html>
<head>
 <title>My Dynamic Greeting</title>
</head>
<body>
 <p data-text="Hello, ${name}"></p>
</body>
 <script>
  let name = 'Alice';
 </script>
 <script src="https://cdn.jsdelivr.net/gh/hbroek/reken@latest/dist/reken.min.js"></script>
</html>
```

**Step 4: Open the HTML in a web browser.**

Save your HTML file and open it in a web browser. You should see greeting message "Hello, Alice" displayed on the page.

Congratulations! You've successfully created your first dynamic element using Reken's `data-text` attribute. As you can see, Reken attributes make it easy to incorporate dynamic content into your web pages without complex JavaScript code.

In the following sections, we'll explore more advanced scenarios, including conditional rendering, handling user input, and working with REST APIs, all using Reken attributes.

## 3.3 Conditional Rendering

Conditional rendering is a powerful feature that enables you to show or hide elements based on specific conditions. Reken provides the `data-if` attribute for accomplishing this. Let's dive into conditional rendering.

### 3.3.1 Basics of Conditional Rendering

Conditional rendering allows you to display or hide elements based on the evaluation of a condition.

Here's how the `data-if` attribute works:

1. **Using Boolean Expressions:**

   You can use a boolean expression as the value of the `data-if` attribute. When the expression evaluates to `true`, the element is shown, and when it evaluates to `false`, the element is hidden (by setting `display: none`).

   **Example:**
   ```html
    <div data-if="x > 0">This element is shown when x is greater than 0.</div>
   ```

2. **Using CSS Classes:**

   In addition to simple showing and hiding, you can specify a classname followed by a colon (`:`) and then a boolean expression. When the expression is `true`, the classname is added to the element, and when it's `false`, the classname is removed.

   **Example:**
   ```html
    <div data-if="isVisible:showElement">This element will have the 'showElement' class when isVisible is true.</div>
   ```

   This allows you to control the visibility and styles of elements using CSS classes, which is especially useful for handling animations based on class changes.

### 3.3.2 Conditional Rendering in Practice

Let's explore some real-world examples of conditional rendering using the `data-if` attribute:

**Example 1: Showing an Element Based on a Condition**

Suppose you want to show a message to the user when a specific condition is met. Here's how you can do it:

```html
<div data-if="unreadMessages.length>0">You have unread messages!</div>
```

In this case, the message "You have unread messages!" will only be displayed if the JavaScript array `UnreadMessages` has array items.

**Example 2: Applying CSS Classes for Animation**

You can use conditional rendering with CSS classes to add animations to elements. For instance, you can create a simple fade-in effect:

```html
<div data-if="fade-in:isVisible">This element will fade in when isVisible is true.</div>
```

In your CSS, you can define the `fade-in` class to include animation properties, creating a smooth transition effect.

Conditional rendering with the `data-if` attribute is a valuable tool for creating responsive and interactive web pages.

## 3.4 Render Iterations

Looping over expressions that can iterate with the `data-for` attribute is a powerful Reken render feature. 

**Example 1: Render 5 div's**

The simplest expression to loop over is just a number or a javascript variable that represents a number. For example you can render 5 divs with the index.
```html
<div data-for="loopVar:5">
 <div data-text="${loopVar.index}"></div>
</div>
```

**Example 2: Render a list of li's from the contents of an array**

Providing an array as the expression allows you to loop over the elements of the array. For example you can render 3 LI's with the item property of the loopVar.

```html
<script>
 let myArray = ['John', 'Tracy', 'Taylor'];
</script>
<ul data-for="loopVar:myArray">
 <li data-text="${loopVar.item}"></li>
</ul>
```

Iterating over collection-based data structures with `data-for` is a powerful feature to display HTML lists, tables and grids.

## 3.5 Handling User Input

Handling user input is a critical aspect of building interactive web applications. Reken simplifies this process by providing the `data-value` attribute, which allows you to bind JavaScript variables to input elements for two-way data binding.

### 3.5.1 Binding Input Elements

The `data-value` attribute is used to bind a JavaScript variable to an input element, ensuring that changes in the input element are reflected in the variable and vice versa. This is incredibly useful for creating forms and interactive elements.

Here's how it works:

```html
<input type="text" data-value="userName"/>
```

In this example, the `data-value` attribute binds the `userName` variable to the input field. Any changes made in the input field will automatically update the `userName` variable, and changes to the variable will be reflected in the input field.

### 3.5.2 Supported Input Types

Reken's `data-value` attribute supports various input types, including:

- `text`: For text input fields.
- `number`: For numeric input fields.
- `checkbox`: For checkboxes.
- `radio`: For radio buttons.
- `file`: For file input fields, allowing you to handle file uploads.
- `range`: For range input fields.
- `select`: For select elements.
- And more...

The `data-value` attribute provides seamless handling and binding for input elements like checkboxes, radio buttons, and select elements.

### 3.5.3 File Upload Handling

The `data-value` attribute for file input fields makes file uploads easy to handle. When you bind a JavaScript variable to a file input element, the variable contains the `File` object of the uploaded file. This object includes properties such as `name`, `size`, `lastModified`, `type`, and `data`. The `data` property has the deserialized content of the file.

You can even specify a transform function to handle non-JSON file formats. The transform function receives the uploaded text and the `File` object, allowing you to deserialize the file as needed. This feature is particularly valuable when working with XML, CSV, or other data formats.

Handling user input with the `data-value` attribute simplifies creating forms, collecting user data, and making web applications interactive.

## 3.6 Working with REST APIs

Interacting with RESTful APIs is a common task in web development. Reken streamlines this process with the `data-rest` attribute, enabling you to dynamically load data from REST endpoints and update your web page.

### 3.6.1 Retrieving Data from REST Endpoints

The `data-rest` attribute is used to fetch data from a REST API endpoint and store it in a JavaScript variable. It's a powerful tool for populating your web pages with dynamic data.

Here's how you can use the `data-rest` attribute:

```html
<div data-rest="userData:json/user/jsmith.json"></div>
```

In this example, the `data-rest` attribute fetches user data from the `/api/user/jsmith.json` endpoint and stores it in the `userData` JavaScript variable. When the REST call is complete, the variable contains an object automatically created from the JSON response data.

### 3.6.2 Handling REST API Call Status

Reken makes it easy to handle the status of REST API calls. It automatically adds classes to the element with the `data-rest` attribute based on the status of the call:

- `reken-rest-busy`: Added during the API call.
- `reken-rest-done`: Added when the call is completed successfully.
- `reken-rest-error`: Added in case of an error.

You can use these classes to change the appearance or behavior of elements on your page, providing feedback to users about the status of the API call.

### 3.6.3 Parameterizing REST Calls

The `data-rest` attribute allows you to parameterize your REST API calls using an evaluated template string. This means you can construct the API endpoint URL with dynamic values.

**Example:**

```html
<div data-rest="userData:/json/user/${userId}"></div>
```

In this example, the `${userId}` placeholder is replaced with the actual value of the `userId` variable when the API call is made. When the value of `userId` changes, the REST API call is automatically executed again.

Working with REST APIs using Reken's `data-rest` attribute simplifies data retrieval and updates, making your web applications more dynamic and responsive.

In this chapter, we've covered the basics of Reken, including the core Reken attributes, creating dynamic elements, conditional rendering, handling user input, and working with REST APIs. These foundational concepts will be essential as you build dynamic and interactive web applications with Reken.