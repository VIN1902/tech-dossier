# First Class Function
a concept in JS that allows a function to be:
- stored in a variable
- stored in a data structure (like array,object)
- passed as an argument in another function
- returned from another function
# Use cases of concept called first class funcitons
- high order functions
- closure
- callback
- function composition
- currying
- and more...
# Callback
callback is the name of the function that you pass as an argument to a parent function AND the parent only when itself is called, by extension calls the callback.
```js
function parent(callback) {
    callback();
}
parent(myFnx);
// myFnx is a callback as it was passed as an argument to another function and only be called when the parent function is called
```