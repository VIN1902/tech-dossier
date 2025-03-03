console.log("Hi");

fetch("https://api.freeapi.app/api/v1/public/randomjokes")
    .then((response) =>
        response
            .json()
            .then((convertedData) => {
                console.log(convertedData); 
            })
            .catch((err) => {
                console.log("error converting to json object");
            })
    ) 
    .catch((error) => console.error("Error fetching data:", error));

console.log("Bye");

// OR

console.log("Hi");

fetch("https://api.freeapi.app/api/v1/public/randomjokes")
    .then((response) =>response.json()) // .json() also returns a promise so in next line we can write one more then for new promise
    .then((convertedData) => console.log(convertedData))
    .catch((error) => console.error("Error fetching data OR maybe converting to json", error));

console.log("Bye");


/*
fetch('url')
    .then( (res)=>{} )
    .catch( (err)=>{} )
    .finally( ()=>{} )
*/

/*
.json() method works on an incoming JSON format of data from a server (usually a string)
it converts it into a json object
that process is asynchronous
so it returns a promise
*/

/*
BIG ISSUE:
- The above code is very ugly looking cause of then chaining, callback hell
- this is simple code to get some data from api AND this is the case after prettier extension 💀
- We NEED a syntax sugar over all this bro
*/