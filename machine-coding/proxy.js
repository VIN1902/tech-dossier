// The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

// Ex: anyone shouldn't be able to acces this user's password (. or [] syntax operation is used to any access object property, how to redefine that?)

const user = {
    name: "Vikas Indora",
    iD: 22104039,
    password: 'TU2B7W9IH'
}

const proxyUser = new Proxy(user, {
    get(target, prop){
        if (prop == "password") {
            throw new Error("Acces Denied")
        } else {
        return target[prop]
        }
    }
})

console.log(proxyUser.name);

// .length is a proxy, looks like a property but acts like a method

console.log("-------------------------------------------------------------------");

// enable negative indexing in arrays

function negativeIndex(arr) {
    return new Proxy(arr, {
        get(target, prop){
            const index = Number(prop)
            if (index < 0) {
                return target[target.length + index]
            } else {
            return target[index]
            }
        },
        set(target, prop, value){
            const index = Number(prop)
            if (index < 0){
               target[target.length + index] = value
            } else {
               target[index] = value
            }
            return true // return the confirmation if set worked
        }
    })
}

const myArr = [1,2,3,4,5]
const proxyArr = negativeIndex(myArr)

console.log(myArr[-1]);
console.log(proxyArr[-1]);

proxyArr[-1] = 69

console.log(myArr);
console.log(proxyArr);

//Both proxyArr and myArr refer to the same underlying array in memory. proxyArr is not a new array. Instead, it is a Proxy object that wraps myArr.
/* 
The 'new Proxy()' creates a brand new Proxy object in memory
'const proxyArr = new Proxy(myArr, handler); (effectively what line no. 52 means), is saying create a new object but that object is proxy which is just a wrapper for original, so it also points to same memory address
myArr     --->  (points to)  [1, 2, 3, 4, 5] (in Heap)
proxyArr  --->  (points to)  Proxy object (in Heap) ---> (points to the same) [1, 2, 3, 4, 5] (in Heap)
*/
/*
what if you wanted a truly new arr on proxy creation?
const proxyArr = new Proxy([...myArr], handler);
myArr     --->  [1, 2, 3, 4, 5] (Heap)
proxyArr  --->  Proxy object (Heap) ---> [1, 2, 3, 4, 5] (New array in Heap)
*/
// so its the behaviour of Proxy Objects to point to same address that of the target object
// Proxy objects in JavaScript do not create copies of the target object; instead, they act as a wrapper around the same memory reference.