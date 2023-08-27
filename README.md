# string-objects

Simple function that resolves object property accessors found in a given string. Accepts a string and refernce object as arguments.

# Installing

```bash
npm install string-objects
```

# Importing

CommonJS

```js
const stringObject = require("string-objects");
```

ESM

```js
import stringObject from "string-objects";
```

TypeScript

```ts
import stringObject, { type Schema } from "string-objects";
```

# Usage

The `stringObject` function will attempt to resolve object property accessors found within the provided String that resolve to a String, Number or BigInt, using the provided object as a reference.

```ts
const oldString =
  "Hello {user.username}! This package is {package.name}, version {package.version.current}";

const object: Schema = {
  user: {
    username: "user",
  },
  package: {
    name: "string-objects",
    version: {
      current: "1.3.0",
    },
  },
};

const newString = stringObject(oldString, object);

console.log(newString);
// Will output 'Hello user! This package is string-objects, version 1.3.0'
```

`string-objects` is also capable of resolving both arrays and maps.

```ts
const oldString = "It can index an {array.0} and a {map.key} as well";

const map = new Map().set("key", "map");

const object: Schema = {
  array: ["array"],
  map: map,
};

const newString = stringObject(oldString, object);

console.log(newString);
// Will output 'It can index an array and a map as well'
```

It can also call functions and resolve the string using the function's return value.

You can declare a function property as callable by appending a colon "`:`" to the property name. You may also declare parameters which will be pased to the function when called.

### Functions

`"funcName:"` - Represents a function with no parameters

`"subtract:first:second"` - Represents a function with two parameters

`"add:first:rest*"` - Represents a function with two or more parameters

By appending an asterisk "`*`" to the end of the last parameter, your function can accept any number of arguments, as long as it is more than the minimum declared. All arguments passed to a function will be of type String

If an invalid number of arguments are found (too few or too many), the function will not be called, and the string will not be resolved.

```ts
const oldString =
  "{noArgs:} | Add: {add:2:3}, {add:1}, {add:1:2:3} | Subtract: {subtract:10:3}, {subtract:1}, {subtract:10:4:2}";

const object: Schema = {
  "add:first:rest*": (...values) => {
    return values.reduce((a, b) => String(Number(a) + Number(b))) ?? 0;
  },
  "subtract:first:second": (first, second) => {
    return Number(first) - Number(second);
  },
  "noArgs:": () => {
    return "No Args";
  },
};

const newString = stringObject(oldString, object);

console.log(newString);
// Will output 'No Args | Add: 5, {add:1}, 6 | Subtract: 7, {subtract:1}, {subtract:10:4:2}'
```

`string-objects` can resolve as many nested objects as necessary, however the final property or return value in the chain must be a String, Number or Bigint. If any other type of value is returned at the end of the chain, it will not resolve.
