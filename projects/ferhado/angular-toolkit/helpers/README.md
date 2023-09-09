# @ferhado/angular-toolkit/helpers

## Overview

A collection of utility functions to simplify common tasks in Angular applications.

## Installation

```bash
npm install @ferhado/angular-toolkit
```

## Features

- Date formatting
- Type checking
- JSON manipulation
- Pagination options
- Device token generation
- Unique ID generation
- Rounding numbers
- Element printing

## Usage

### Import the module

```typescript
import { date, is, json, generatePaginationOptions, getDeviceToken, uniqid, round, printElement } from "@ferhado/angular-toolkit/helpers";
```

### Date Formatting

Converts a date to SQL format.

```typescript
const formattedDate = date.sqlFormat(new Date()); // Returns date in 'YYYY-MM-DD' format
const formattedDateTime = date.sqlFormat(new Date(), true); // Returns date and time in 'YYYY-MM-DD HH:MM:SS' format
```

### `is` Features

A collection of utility functions to perform various checks.

- `function`: Checks if the argument is a function.

- `object`: Checks if the argument is an object and not null or an array.

- `array`: Checks if the argument is an array.

- `string`: Checks if the argument is a string.

- `date`: Checks if the argument is a valid Date object.

- `equal`: Checks if two values are equal (deep comparison).

- `image`: Checks if a value is an image MIME type (e.g., 'image/png').

#### Usage

```typescript
import { is } from "@ferhado/angular-toolkit/helpers";

console.log(is.function(() => {})); // true
console.log(is.object({ key: "value" })); // true
console.log(is.array([1, 2, 3])); // true
console.log(is.string("Hello, World!")); // true
console.log(is.date(new Date())); // true
console.log(is.equal({ a: 1 }, { a: 1 })); // true
console.log(is.image("image/png")); // true
```

These utility functions allow you to perform various checks on values and data types.

### JSON Manipulation

Converts objects to JSON strings and parses JSON strings to objects.

```typescript
const jsonString = json.string(obj); // Returns JSON string
const parsedObj = json.parse(jsonString); // Returns parsed object
```

### Pagination Options

Generates an array of pagination options based on the maximum length.

```typescript
const options = generatePaginationOptions(1000); // Returns [25, 50, 100, 200, 300, 400, 500, 1000]
const customOptions = generatePaginationOptions(1000, [10, 20, 30]); // Returns [10, 20, 30, 1000]
```

### Device Token

Generates or retrieves a device token and stores it in local storage.

#### Usage

```typescript
const token = getDeviceToken(); // Returns a 32-character device token
```

### Unique ID

Generates a unique ID.

```typescript
const id = uniqid(); // Returns a 22-character unique ID
```

### Rounding Numbers

Rounds a number to a specified number of decimal places.

```typescript
const rounded = round(123.456, 2); // Returns 123.46
```

### Print Element

Prints a specified HTML element.

```typescript
// Add the following CSS to your stylesheets
// This CSS is used to control element visibility during printing
body > * {
  display: none !important;
}

.fat-element-to-print {
  display: block !important;
}

printElement('elementId');  // Prints the element with the given ID
```

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
