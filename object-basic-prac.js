const teas = {
    name: "Lemon Tea",
    type: "Green",
    caffine: "Low",
};

//access a prop.
console.log(teas.name);
console.log(teas["type"]);

// add new prop
teas.origin = "China";

//  change prop
teas.caffine = "Medium";

/*
When you add/change a prop in const object, its possible cause the value is updated in heap and the const keywords locks the stack 'teas' name which is just holding the address (reference) to it.
when trying to do this: teas = {new: 'xyz'} the error comes cause now you are creating a new object {new: 'xyz'} and trying to store its new address in pointer called 'teas' in stack (which const doesn't allow).
in case of let, the operation of reassigning address is possible but doing so makes an orphaned object at that old address, so in JS garbage collector auto deletes it after a while from heap too.
*/

// remove type prop
delete teas.type;

// check for a property called origin
for (let key in teas) {
    if (key == "origin") {
        console.log("origin prop exits");
    }
}
// OR to do the same
console.log("origin" in teas);

// for-in to print all prop
for (let key in teas) {
    console.log(`${key}: ${teas[key]}`);
}

// nested object
const manyTeas = {
    greenTea: {
        caffine: "low",
        origin: "china",
    },
    lemonTea: {
        caffine: "high",
        origin: "india",
    },
};

// create a copy of tea
const copyTea = {
    ...teas,
};
/*
This a shallow copy, new obj created which has same prop as teas due to spread operator but this new obj in heap has a new address that is stored in a new variable 'copyTea' in stack
So, we do not have a scenario where to diffrent pointers are refering to same object in heap.
*/

console.log(teas);
