```js

/*
suppose a code:
let a = 10
let b = 10
let temp = getTemp() // asynchronous as it is sending a api call to server, so will take some time respond
// but callstack doesn't wait for anything, it just executes everything in sequence synchronously
// so next line would throw error or something
// but what happens is async actions return us a 'promise' synchronously, value can be given to it later
// promise is instant but asks for a callback fn and says that when value will be recieved then i'll give that callback fn to callstack for execution
let sum = a + b + temp
*/

// 'window.fetch()' is a method of browser object that allows us to give api call to a server url to request for some data on there.

/*
Promise.prototype.then = function( callbackFn ) {
    // jab bhi value available hogi
    callbackFn(value)
}
*/


/*
console.log('Hi');
let dataReq = fetch('https://api.github.com/users/Bard')
dataReq.then( (response)=>console.log('data agya', response) ) // data aana ek asynchronous task hai so wait for it
console.log('Bye');
*/

// promise are synchronous in initial execution (creation) but their resolution is asynchronous

/*
1️⃣ Call Stack Execution

- console.log('Hi') → Executes immediately (prints "Hi").
- fetch() → Returns a pending promise, does not block, sends a request to Web API.
- .then(callback) → Registers the callback but does NOT go to MTQ yet (because the promise is still pending).
- registering is done by runtime environment (browser/nodejs), what it means:
    - The JavaScript runtime stores the callback function in memory.
    - It associates the callback with the pending promise returned by fetch().
    - It does NOT execute the callback immediately—it just keeps track of it for later.
- console.log('Bye') → Executes immediately (prints "Bye").

2️⃣ Web API Handles fetch()

- The network request is processed asynchronously in the Web API.
- JavaScript moves on without waiting for the response.

3️⃣ Promise Resolves → Callback Moves to Microtask Queue

- When the network response arrives, the promise resolves.
- Now, .then(callback) is pushed into the Microtask Queue.

4️⃣ Event Loop Checks
- The Call Stack is empty after "Bye" is printed.
- The Event Loop picks the .then(callback) from the Microtask Queue and pushes it to the Call Stack.
- The callback (console.log('data agya', response)) executes.
*/

/*
Think of registering a callback like ordering food at a restaurant:
1️⃣ You (JavaScript) place an order (fetch() call).
2️⃣ The waiter (Web API) sends the order to the kitchen (server request).
3️⃣ The chef (server) prepares the food asynchronously.
4️⃣ The waiter remembers which table (callback function) ordered the food (this is registering the callback).
5️⃣ Once the food is ready, the waiter delivers it to your table (Microtask Queue).
6️⃣ You eat the food when you’re ready (Call Stack executes the callback).
*/

/*
so then(), registering (storing it in memory) and its completion (some value recieved from url) both happen in browser/nodejs only after which it is sent to MTQ.
Registering (then()) → JavaScript runtime (V8 in Chrome, Node.js) stores it in memory.
Completion (fetch response arrives) → Web API/Node.js thread handles it.
Sent to Microtask Queue → Only after the promise resolves.
*/

// only the promise creation part of the fetch is handled by engine but not the resolution and registering part, that is happening in web api/node api/environment
// js environment = engine (callstack,heap,MTQ,CTQ,event loop) + api that comes with environment (to handle async work like file access, networking)
// Think of an API as just a way to expose functionality without showing internal details.
/*
Web APIs (Built into the Browser)/ Node APIs -> Functions like console.log(), fetch(), and setTimeout() are provided by the browser. Even though they are pre-written into the browser (inside the window object), they are still considered APIs because they expose certain functionalities in a structured way.

Third-Party APIs (External Services) -> These APIs (like YouTube API, Twitter API) are hosted on another server, and your JavaScript code sends a request to their servers to use their functionality.
*/
```
# Promise states:
- Pending -> while it is working on making an api call and waiting for sometype of response; when created and before start of operation
- Fulfill -> when response successfully recieved; opertaion produced some value
    - call the function inside .then() when fulfill
- Rejected -> when response fails to come; error during operation
    - call the function inside .catch() when Rejected
- call the function inside .finally() regardless of what happens
(so either .then() or .catch() then .finally() atleast once) (when all three are specified)
- 'settled' state is just an idea (doesn't really exit in JS) that the promise is either fulfilled or rejected and NOT in pending state (tech jargon/lingo)