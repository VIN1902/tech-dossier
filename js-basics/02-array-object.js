const arr = [1,2,3,4,5,6,7,8,9]
console.log(`Total items: ${arr.length}`);
arr.push(10)
arr.pop()
arr.length
arr.slice(0,2) // [1,2]
arr.indexOf(7) // if '7' exits then its index return else return -1

let index = arr.indexOf(3)
if (index !== -1){
    console.log(arr.splice(index, 1));
}

arr.forEach((value, index)=>{
    console.log(`${index + 1}: ${value}`);
})

// concatination
let newArr = [10,11,12,13]
arr.concat(newArr)
let joinedArr = [...arr, ...newArr, 14,15,16]
console.log(joinedArr);

// object literals
let myData = {
    name: 'vikas',
    age: 22,
    isLonely: true,
    address: {
        flat: 68,
        block: 'A',
        apartment: 'Parwana',
        city: 'Mayur Vihar',
        state: 'Delhi',
        pincode: 110091,
        landmark: ['ASN School', 'Samachar Apartment']
    }
}
console.log(myData.address.landmark[0]);

//copy objects
let newData = myData // doesn't copy 'newData' has same address as 'myData' pointing to same mem. space in heap, so any change in one changes other.
newData = {
    ...myData,
    oldAddress: {
        flat: 91,
        block: null,
        apartment: 'Sadar',
        city: 'Mayur Vihar',
        state: 'Delhi',
        pincode: 110091,
        landmark: ['ASN School', 'Samachar Apartment']
    }
}
console.log(newData);
/*
NOT destructuring
let name = myData.name
let age = myData.age
*/
let {name: userName, age} = myData; // object destructuring -> renaming using 'originalName : newName'
let [num1, num2] = arr // array destructuring -> no need to rename, array is sequential
console.log(userName + ' ' + age);
