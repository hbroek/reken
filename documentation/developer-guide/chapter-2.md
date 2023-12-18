

# Chapter 2: Installing Reken

Before you can harness the power of Reken to create dynamic web pages, you need to add Reken to your web project. In this chapter, we'll walk through the process of installing Reken and adding it to your HTML documents. 

## 2.1 Obtaining Reken

Reken is distributed as a JavaScript library that you can include in your project. You can obtain the Reken library from various sources, such as:

* **Official Website**: The Reken library can typically be downloaded from the official Reken website (https://www.reken.dev). Look for the latest version available for download.

* **CDN**: You can link to the Reken library directly from a content delivery network (CDN), such as jsDelivr (https://cdn.jsdelivr.net/gh/hbroek/reken/dist/reken.min.js). This method doesn't require you to download or host the library yourself.

* **GitHub Repository**: The source code for Reken is also available on [GitHub Reken project page](https://github.com/hbroek/reken). You can clone or download the repository to access the library files. You can find the minified / compressed files in the `dist` folder.

## 2.2 Including Reken in Your Web Project

Once you have the Reken library file, you need to include it in your HTML documents. Here's how you can do that:

### 2.2.1 Using a Script Tag

The most common way to include Reken in your project is by using a `<script>` tag. Add the following code at the bottom of your HTML document, just before the closing `</html>` tag:

```html
<!DOCTYPE html>
<html>
 <head>
 <!-- Your HTML document's head content -->
 </head>
 <body>
 <!-- Your HTML content -->
 </body>
 <!-- Include the Reken library -->
 <script src="path/to/reken.js"></script>
</html>
```

Replace `"path/to/reken.js"` with the actual path to the Reken library file. This script tag loads the Reken library and makes it available for use in your web pages.

### 2.2.2 Using a Content Delivery Network (CDN)

If you prefer to use a CDN, you can directly link to the Reken library. Here's how you can do that:

```html
<!DOCTYPE html>
<html>
 <head>
  <!-- Your HTML document's head content -->
 </head>
 <body>
  <!-- Your HTML content -->
    
 </body>
 <!-- Include latest Reken version from a CDN -->
 <script src="https://cdn.jsdelivr.net/gh/hbroek/reken@latest/dist/reken.min.js"></script>
</html>
```

In this example, we're using the jsdelivr CDN to link to the latest version of Reken. You can also reference a specific Reken version. For example `https://cdn.jsdelivr.net/gh/hbroek/reken@v0.9.3/dist/reken.min.js` references Reken version 0.9.3.

## 2.3 Verifying the Installation

To ensure that Reken has been successfully added to your project, you can perform a simple test. In your HTML document, add a `<script>` tag with the following code:

```html
...
<script src="https://cdn.jsdelivr.net/gh/hbroek/reken@latest/dist/reken.min.js"></script>
<script>
  console.log(reken.version);
</script>
```

When you load this web page in your browser, the Reken library will output its version number to the browser's console. This confirms that Reken is correctly included and available for your project.

## 2.4 Browser Support

Reken relies on modern JavaScript features and ES6 syntax. As a result, it is supported in modern web browsers, including:

- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

It's essential to keep this in mind, especially if you're working on projects that may need to support older browsers. You may need to provide alternative solutions with older browser versions.

## 2.5 Upgrading Reken

Reken is actively developed, and updates are periodically released to enhance its features and address any issues. When a new version of Reken becomes available, consider upgrading to benefit from these improvements.

To upgrade Reken, you can follow the installation process outlined earlier but replace the existing Reken library file with the latest version. Check the official Reken website or the source repository for release notes and instructions related to specific version updates.

In the following chapters, you will dive deeper into using Reken's features and attributes to create dynamic web pages. Chapter 3 will introduce you to the core concepts and attributes of Reken, which are essential for understanding how Reken simplifies the process of building dynamic web applications.

Now that you have successfully installed Reken, Explore its core concepts and attributes in the upcoming chapter.
