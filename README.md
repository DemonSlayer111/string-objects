# string-objects

Simple function that resolves object property accessors found in a given string. Accepts a string and refernce object as arguments.

# Installing

```bash
npm install string-objects
```

# Usage

The `stringObject` function will attempt to resolve object property accessors found within the provided String that resolve to a String, Number or BigInt, using the provided object as a reference.

```js
const stringObject = require("string-objects");

const oldString =
  "Hello {user.username}! This package is {package.name}, version {package.version.current}";

const object = {
  user: {
    username: "user",
  },
  package: {
    name: "string-objects",
    version: {
      current: "1.0.1",
    },
  },
};

const newString = stringObject(oldString, object);

console.log(newString);
// Will output 'Hello user! This package is string-objects, version 1.0.1'
```

`string-objects` can resolve nested objects, as well as index array elements, however, the last property in the chain will not resolve if it is not a String, Number, or BigInt.

```js
const stringObject = require("string-objects");

const oldString = "Hello {user.0}! This package is {package.name}";

const object = {
  user: ["user"],
  package: {
    name: function () {
      return false;
    },
  },
};

const newString = stringObject(oldString, object);

console.log(newString);
// Will output 'Hello user! This package is {package.name}'
```
