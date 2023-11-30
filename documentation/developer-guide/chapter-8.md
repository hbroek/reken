# Chapter 8: Best Practices

In this chapter, we'll discuss some best practices for working with Reken. Following these guidelines will help you build efficient and maintainable web applications while leveraging Reken's capabilities.

## 8.1 Structuring Your Reken-Based Projects

When working on a project that uses Reken, it's essential to have a well-structured project setup. This ensures that your code is organized and easy to manage. Here are some best practices for structuring your Reken-based projects:

- **Separation of Concerns**: Divide your project into logical sections, such as HTML templates, styles, and JavaScript.

For simple Reken projects that involve HTML-First __Single__ Page Applications (SPA) the most efficient way is to store all the styling, javascript in one HTML file. Besides optional thirdparty.js files, the only external dependency would be the Reken library. The HTML file is organized as follows.

```html
<!DOCTYPE html>
<html lang="en">

  <head>
      <title>Page Title</title>
      <style>
        /* Style definitions */
      </style>
  </head>

  <body>
    <!-- html -->
  </body>

  <template data-component='a-component'>
    <!-- Optional component definitions -->
  </template>
  ...

  <script>
    // Optional js variable declations, functions and eventhandlers
  </script>

  <script src="js/thirdpartylibs.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/hbroek/reken/dist/reken.min.js"></script>

</html>
```

When you have a more complex website with multiple HTML pages that share resources such as styling, js files and components, a HTML filelayout would look as follows.

```html shared
<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="css/stylesheet.css">
  </head>

  <body>
    <!-- html -->
  </body>

  <div data-include="comps/components.html"></div>
  <script src="js/app.js"></script>

  <script src="js/thirdpartylibs.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/hbroek/reken/dist/reken.min.js"></script>

</html>
```
In this example we reference to an external stylesheet `stylesheet.css` in the `css` folder for the style definitions shared between the html pages.

It also includes the `components.html` file in the `comps` subfolder, this contains the definition of components shared across the project.

The `app.js` with the application code, and `thirdpartylibs.js`, with the thirdparty code are loaded from the `js` subfolder.

Finally we load the `reken` library from the CDN, or alternatively can be hosted in the `js` folder.

- **Modular Components**: Create reusable components for your UI elements. Use the `data-component` attribute to define and use components within your project. Component reuse can help your project in multiple ways.

Creating a Reken based `data-component` component for a repeating content such as a `button` we ensure consistency with the page. 

Same applies to reusing components across different HTML files in the same project by loading them with `data-include`.

Third and best advantage of component re-use is the creating of a component library that can be used by different projects and can even be shared with others.


- **File Organization**: Maintain a consistent file organization. Place components in their own folders, group styles together, and structure your project in a way that makes it easy to locate specific files. As discussed earlier when creating a more complex project with multiple HTML pages, it is a good idea to share resources by storing them in files external from the HTML file.

```text
- index.html
- other-html-files.html
- js
  - app.js
  - thirdpartylibs.js
  - reken.js
- css
  - stylesheet.css
- comps
  - components.html
-img
  - image1.jpg
  - image2.png
  - ...
```

- **Version Control**: Use version control systems like Git to keep track of changes in your project. This helps in collaboration and allows you to roll back to previous versions if needed.

## 8.2 Optimizing for Performance

Performance is a critical aspect of web development. While Reken simplifies dynamic web page creation, it's essential to ensure that your application runs efficiently. Here are some performance optimization tips:

## 8.2.3 Minimize DOM Updates

Reken updates the DOM efficiently, but excessive updates can impact performance. Avoid unnecessary changes to the DOM, and update only when needed. 

Underneath the cover, Reken optimizes updates by first checking whether DOM actually needs to be updated, and will only do so when the DOM would really change. Instead of hiding UI using styles or classes, used `data-if` or `data-route` to hide UI elements. As besides hiding the UI it also stops executing the model to update the UI in these hidden (and thus deactivated) HTML branches.

```html
  <main data-route="page1">
    ...
  </main>
  <main data-route="page2">
    ...
  </main>
  <main data-route="page3">
    ...
  </main>
  <main data-route="page4">
    ...
  </main>
```
In this SPA exmaple only the HTML element of the active route is displayed and executed. With these 4 pages only 1 pages is every visible and its UI gets updated by the model.

## 8.2.3 Caching

Cache data retrieved from REST APIs to reduce redundant network requests. This can significantly improve load times. Making use of the HTTP 304 response codes and cache-control headers can limit unnecessary network calls.

## 8.2.4 Lazy Loading

Implement lazy loading for resources like images or components that are not immediately needed on the page. This reduces initial page load times. With the use of `data-if` and `data-route` the sections of HTML that are not visible do not need to load images, unfortunately the browser will still load these images unless you add a property `loading="lazy"` to each `img` element and hiding the `body` element on startup and only after Reken is initialized, show it.

```html
<!DOCTYPE html>
<html>
<script>
  let show = false;
</script>
<body style="display:none" data-on-rekenready="e.target.style.display='initial'">

  <button data-action="show=true">Show image</button>
  <main data-if="show">
    <img loading="lazy" src="portfolio/henry.jpg"/>
  </main>

</body>
<script src="../src/reken.js"></script>
</html>
```

In this example we set the attribute `loading="lazy"` on the `img` element. The `img` is part of an HTML branch of the `main` element with a `data-if` attribute.

On initialization we also need to hide the `body` element in order for Reken to get a chance to hide the `main` element. Once that is done, after the event `rekenready` is fired we can reset the `body` to its initial value, which will make it visible. 

The image will now only get loaded when the user clicks the "Show" `button`.

A similar  approach can be used to prevent rest calls to execute, by hiding them with a data-if or a data-route tag.
```html
<!DOCTYPE html>
<html>
<script>
  let load = false;
  let list
</script>
<body style="display:none" data-on-rekenready="e.target.style.display='initial'">

  <button data-action="load=true">Load json</button>
  <main data-if="load">
    <ol data-rest="list:json/employees.json" data-if="list" data-for="employee:list">
      <li data-text="${employee.item.name}"></li>
    </ol>
  </main>

</body>
<script src="../src/reken.js"></script>
</html>
```
In this example we active the `main` Element only when the `load` variable is true. As a result the result call will not execute until that happens. There is a `data-if` to make sure that the `data-for` is not executed until the employees are loaded in the `list` variable. Once that happens the list of Employees is rendered.

## 8.2.6 Minify and Bundle
Minify your HTML, JavaScript and CSS files to reduce file sizes. There are two ways to make your HTML and CSS files smaller: minify and compression. In addition your Javascript files have another option to make them smaller which is uglify. Where variable and function names are renamed to shorter symbols, which has that added benefit of obfuscation.

Use bundling tools to combine multiple files into one, reducing the number of requests. Strategies here are to merge all the stylesheet, javascript and component files into the main HTML file, similar to the SPA files as described under section 8.1. Currently there are no Reken specific tools that automate this.


## 8.2.6 Optimize Images
Compress and optimize images to reduce their file size without sacrificing quality. This is crucial for faster page loading. Besides have the images set to the closest resolution they are being shown in the browser, there are also optimizer tools to remove metadata and other optimizations to make the images smaller.


## 8.3 Debugging and Troubleshooting

Debugging and troubleshooting are integral parts of the development process. Reken provides tools and techniques to facilitate this process. Here's how to effectively debug and troubleshoot Reken-based projects, when a page does not or partially render.

## 8.3.1 Validate your HTML
Use your editor's HTML formatting tools to check if your HTML is valid. Double check that all HTML opening tags have closing tags, and all attribute quotes have closing quotes.

>**Note** Browser sometimes add tags to the HTML to make it valid. For example typically a `tbody` tag is added between the `table` and `tr` tags. This can trip you up when you add a `data-for` attribute on the `table` element, where it should be on the `tbody` element.

## 8.3.2 Browser Developer Tools
Use your browser's developer tools to inspect the DOM, examine network requests, and debug JavaScript code. You can set breakpoints and step through your code for debugging.

## 8.3.3. Logging
Implement logging in your Reken-based code to track the flow of your application and identify issues. Use `console.log()` statements to output messages to the browser console.

## 8.3.4 Error Handling
Properly handle errors in your JavaScript code. Use `try...catch` blocks to catch and manage exceptions. This prevents unhandled errors from breaking your application.

## 8.3.5 Testing
Write tests for your Reken components and functions. Automated tests help identify issues early in the development process.

## 8.3.6 Community Support
Take advantage of the Reken community for assistance. Many developers share their experiences and solutions to common issues in online forums and documentation. 

Use the Reken GitHub Discussions if you have questions, want to share ideas, and or have open-ended conversations about the project. Use Reken GitHub discussions for the following topics:

1. **Usage and Implementation:** If you have questions about how to use a certain feature of the product or how to implement it in your own projects.

2. **Feature Requests:** You can discuss potential new features or improvements to the product.

3. **General Queries:** For broader questions about the product, such as its roadmap, compatibility with other tools, or best practices.

4. **Community Support:** It's a great place to get help from the community, engage with other users, and share your own experiences or solutions.

However, it's important to note that Reken GitHub Discussions is not the ideal place for:

- **Reporting Bugs:** These are usually better reported in the Issues section, where they can be tracked and resolved systematically.
- **Filing Enhancement requests:** These are also better reported in the Issues section as an Feature Request so that they like bugs can be tracked and resolved systematically.
- **Confidential or Sensitive Questions:** Public discussions are visible to everyone, so it's not suitable for questions that involve sensitive or proprietary information.


## 8.3.7 Summary
By following these best practices, you'll be able to structure your Reken-based projects effectively, optimize their performance, and efficiently debug and troubleshoot any issues that may arise during development.