# What is constructor function
- A constructor function is simply a regular function used to create objects following a specific structure.
- Instead of returning a value manually, a constructor function is used with the new keyword to create an instance (object).
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.name); // Alice
console.log(person2.age);  // 30
```

# How 'new' works
- In simple terms it allocates a new memory space in heap and then return its address
- In depth:
    1. Creates a new empty object {}
    2. Sets the prototype of this object to the constructor function’s .prototype.
    3. Calls the constructor function, passing this as the newly created object.
    4. Returns the new object (unless the function explicitly returns a different object).

# Achieve inheritance
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding a method to the prototype
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
};

const person4 = new Person("Dave", 35);
person4.greet(); // Hello, my name is Dave
```

# In ES6, Classes were introduced to sugar-coat contructor functions and prototype inheritance
```js
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const person6 = new PersonClass("Hank", 55);
person6.greet(); // Hello, my name is Hank
```