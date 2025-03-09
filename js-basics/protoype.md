# What is Prototype
- Each datatype/datastructure in JS is associated with a built-in global [constructor function](./constructor-function.md). (Array, Object, Function)
    - ex: let arr = [] is derived from a global Array constructor
    - In ES6 terms think of it as instances of a class

- These global objects have some functionalities defined in them so that each instance derived from it 'inherits' those same funcitonalities.
    - ex: arr.map() is coming from map function defined in Array{}

- Each of these global objects have a key(property) called 'prototype' which stores these functions.

- whenver you create an instance of them, JS automaticaly sets '__proto__' that stores all the functions from its parent
    - arr.__proto__ = Array.prototype (this link enables inheritance)
    - When you call arr.map(), JavaScript looks up map in arr itself, and if it doesn't find it, it checks arr.__proto__ (which points to Array.prototype).

- So every instance has a __proto__ property (a reference, not a copy) that links to its global object's (constructor function) .prototype.

- This kind of inheritance is called prototype chain.
    - if you want to break chain: arr.__proto__ = null
    - At the top of the chain is the global Object constructor. Every other built-in constructor function’s prototype eventually links to Object.prototype.

- In coding standard we prefer former instead of latter:
    1. Object.getPrototypeOf(arr) === Array.prototype
    2. arr.__proto__ === Array.prototype

# Clarifications
- In ES5 and before, Constructor functions were the main method for object instantiation and inheritance.
    - ES6 classes are just a cleaner way to do the same thing.
- Brendan Eich invented the concept of constructor functions in JavaScript.
    - Global constructor functions (Array, Object, Function, etc.) were later formalized and improved by ECMAScript in later versions.
- 'new', 'constructor functions' and 'prototype inheritance' were part of JavaScript since its creation in 1995.