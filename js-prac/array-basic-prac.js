let teas = ["Green tea", "Black tea", "oolong tea", "white tea", "herbal tea"];

// add another tea
teas.push("chamomile tea");
console.log(teas);

// remove oolong tea
let index = teas.indexOf("oolong tea"); // returns -1 if not present else the index of first instance found
if (index > -1) {
    teas.splice(index, 1);
}
// we did this (checking if oolong tea exists in array) and not direct splice method, cause we don't wanna remove the hardcoded index's element even if its not specified item asked.

// filter only caffeinated ones
const caffeinatedTeas = teas.filter((e) => e !== "herbal tea");
console.log(caffeinatedTeas);

// for loop to print each tea
for (let i = 0; i < teas.length; i++) {
    console.log(teas[i]);
}

// for loop to count caffeinated teas
let countOfCaffeinatedTeas = 0;
for (let i = 0; i < teas.length; i++) {
    if (teas[i] == "herbal tea") {
        continue;
    } else {
        countOfCaffeinatedTeas++;
    }
}
console.log(`How many caffeinated teas? Ans: ${countOfCaffeinatedTeas}`);

// for loop for finding tea with most characters
let maxLengthTea = "";
for (let i = 0; i < teas.length; i++) {
    if (teas[i].length > maxLengthTea.length) {
        maxLengthTea = teas[i];
    }
}
console.log(`Tea with longest name: ${maxLengthTea}`);

// an reversedTeaList using for loop
let reversedTeaList = [];
for (let index = teas.length - 1; index >= 0; index--) {
    reversedTeaList.push(teas[index]);
}
console.log(reversedTeaList);
