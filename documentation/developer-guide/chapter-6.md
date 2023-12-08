

# Chapter 6: JavaScript API

In this chapter, we'll explore the JavaScript API provided by Reken. The API allows you to interact with Reken programmatically, providing more control over the dynamic aspects of your web application.

## 6.1 Reken Object Overview

The `reken` object is the main entry point to Reken's JavaScript API. It provides methods and properties that enable you to manage Reken's behavior and perform various actions within your application. Here's an overview of the `reken` object:

- `reken.version`: A property that holds the version number of the Reken library.

- `reken.force_calculate()`: A function that forces Reken to recalculate and update the user interface. This can be useful when you need to trigger an update manually.

- `reken.forceCalculate()`: (Deprecated) This is an older method for forcing Reken to recalculate and update the user interface. It is recommended to use `reken.force_calculate()` instead.

- `rekenready` and `rekeninitialized` events. The events are fired on the HTML page's body event when Reken finishes initializing and/or updates the UI during startup.

## 6.2 reken.version

The `reken.version` property allows you to check the version of the Reken library currently in use. This can be helpful when you want to ensure that your application is using the correct version or when dealing with compatibility issues.

**Example: Checking the Reken Version**

```javascript
console.log("Reken version: " + reken.version);
```

## 6.3 reken.force_calculate()

The `reken.force_calculate()` function is a powerful method for manually triggering Reken's recalculation and UI update process. While Reken automatically updates the UI in response to various events, there may be cases where you need to initiate an update explicitly, such as asynchronous events.

**Example: Forcing Reken to Update the UI**

```javascript
// Your custom logic that requires a Reken update
// ...

// Force Reken to recalculate and update the UI
reken.force_calculate();
```

This function is particularly useful when dealing with changes or events that are not directly managed by Reken but still need to reflect in the user interface.

## 6.4 reken.forceCalculate() (Deprecated)

The `reken.forceCalculate()` method was used in older versions of Reken to achieve the same functionality as `reken.force_calculate()`. However, it has been deprecated in favor of the latter. It is recommended to use `reken.force_calculate()` for initiating Reken updates.


## 6.5 rekenready event
The `rekenready` event is fired on the `body` element when Reken is completed initialized and the UI is updated at startup.

**Example: `rekenready` **

```html
<body style="opacity:0;transition: opacity 1s ease-out"
    data-on-rekenready="e.target.style.opacity=1">
```

In this example, we hide the page contents on startup by setting the opacity to 0. With the data-on-rekenready attribute, we register a listener to show the page contents. When Reken is initialized and the UI is updated, the event fires, and the page becomes visible with a 1-second transition. This is useful to avoid seeing the page re-render when the page initializes.

## 6.6 rekeninitialized event

The `rekeninitialized` event is similar to the `rekenready` event. It is fired when reken is initialized but the UI is not updated yet.

By understanding and using the `reken` object and the startup events `rekenready` and `rekeninitialized`, you gain more control over the behavior of Reken in your web application. The ability to manually trigger updates can be valuable when you need precise control over when and how your UI responds to changes and events.
