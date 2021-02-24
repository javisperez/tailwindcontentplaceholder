<h2 align="center">Content Placeholder for Tailwind CSS</h2>

<p align="center">
  A plugin to create utility classes for Content Placeholders.
</p>

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

## Contents

- [Demo](#demo)
- [About](#about)
- [How does it work?](#how-does-it-work)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Configuration](#configuration)
- [Sample Configuration](#sample-configuration)

### Demo
You can see a working demo App here:
https://javisperez.github.io/tailwindcontentplaceholder/

### About
This is a Tailwind CSS Plugin to create utility classes for Content Placeholder and make it easier to display the loading state of resources.

### How does it work?
Based on a given configuration file it creates a dynamic background image in the pseudo-elements and adds an (optional) opacity animation.

### Installation
With NPM:
```sh
$ npm install tailwind-content-placeholder
```
Or if using Yarn:
```sh
$ yarn add tailwind-content-placeholder
```

### How to use
In your `tailwind.config.js` file, include the plugin and initiate it with the proper configuration.

**Example**
```js
module.exports = {
  plugins: [
    require('tailwind-content-placeholder')({
      placeholders: {
        'paragraph': {
          height: 4, // the height of the container in em
          rows: [ // This class will have 4 rows:
            [100], // A 100% width row
            [100], // Another 100% width row
            [40], // A 40% width row
            [] // And an empty row, to create separation
          ]
        },
      }
    }),
  ],
}
```

After that, you'll have a set of utilities classes you can use to show the placeholder:

```
<div :class="{ 'cp-paragrah': isLoading }">
  {{ content }}
</div>
```

The classes will be prefixed by the given custom prefix or will use `cp-` by default.

### Configuration
The configuration values that can be passed to the plugin are:

| Option | Type | Default Value | Description |
|-- | -- | -- | --|
|prefix|String|cp|The prefix to use when generating the utility classes.|
|borderRadius|Number|4|Border radius value for the corners of each rendered line.|
|animationDuration|String|"1.4s"|Duration of the animation in a CSS format.|
|animated|Boolean|true|Enable/Disable the background opacity animation.|
|bgColor|String|"rgba(0, 0, 0, 0.1)"|Background color for each line in CSS format.|
|height|[Number, String]|1|Height of the wrapper. If a number is given will be considered `em`.|
|width|[String, Number]|"80%"|Width of the wrapper in CSS format. If a number is given, will be consider `%`.|
|placeholders|[Placeholder[], String]|[]|Collection of objects with configuration and rows to render. A multiline string can also be given, in which a `#` character represents 10% width and spaces represent 10% separation. eg.: `##  ##` will produce 20% blocks with a 20% space separation and another 20% block, in just one single row.|

#### Placeholder
The `placeholders` property is an object which keys must be the name of the CSS class to generate and the values a configuration object with the keys:
| Option | Type | Default | Description |
|-- | -- | -- | --|
|height|Number|Config.height|The height for this specific content, in `em`. If not specified, the global configuration height is used.|
|width|String|Config.width|The width for this specific content in CSS format. If not specified, the global configuration width is used.|
|rows|Multidimensional Array|[]|The rows and segments/lines to render. The segments of lines are Integers that represents the percentage of the width to use. For example, for a full width line, a `[100]` value should be passed. For two segments of half the width, `[50, 50]` should be given. This is a multi dimensional array, the first dimension are the rows while each row contains the segment.|

Alternatively the Placeholder can be a string created with `#` characters, spaces and linebreaks.

### Sample Configuration
This configuration would create two CSS classes called ".cp-line" and ".cp-list" but it is completely customizable:

```js
{
  width: '50%', // Only use the 50% of the container width
  placeholders: {
    // Create a single line content placeholder
    'line': {
      rows: [
        [70] // One row only, with 70% width
      ]
    },
    // Create a "bullet list" like content placeholder
    'list': {
      height: 4, // As this is a sample list, we'll make it a 4 lines placeholder
      rows: [
        [20, 80], // A line with a 20% width segment to simulate the bullet and a 80% width line of content
        [20, 60], // A line with a 20% width segment to simulate the bullet and a 60% width line of content
        [20, 75], // A line with a 20% width segment to simulate the bullet and a 75% width line of content
        [20, 70], // A line with a 20% width segment to simulate the bullet and a 70% width line of content
      ]
    },
  }
}
```
