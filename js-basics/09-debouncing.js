// refer to "./touch-up.md"

function ptaNhi(fn, delay) {
    let myId
    return function (...args) {
        clearTimeout(myId)
        myId = setTimeout(() => {
            fn.apply(this,args)
        }, delay);
    }
}

function greet(name) {
    console.log(`Hello ${name}`)
}

const debouncedGreet = ptaNhi(()=>greet('Vikas'), 2000)
debouncedGreet()
debouncedGreet()
debouncedGreet()
debouncedGreet()

/*
Debouncing: delaying function execution until the user stops triggering it for a set time.

Debouncing ensures a function only executes after a certain delay, and if called again within that delay, it resets the timer.
*/

// simpler example:

/*
function action() {
    console.log("Action performed!");
}

// Call multiple times quickly
action();
action();
action();
action();

but ...
*/

function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer); // Reset the timer if function is called again
        timer = setTimeout(fn, delay); // Wait and execute
    };
}

const debouncedAction = debounce(() => console.log("Action performed!"), 2000);

// Call multiple times quickly
debouncedAction();
debouncedAction();
debouncedAction();
debouncedAction();

// --------------------------------------------

/*
fly rocket: button press after it rocket flys only after a delay but any attempt to press button within the delay the actions cancels and timer for delay restarts


*/
let timerId;

function launchRocket(){
    clearTimeout(timerId)
    timerId = setTimeout(() => {
        console.log(`Rocket 🚀 is up`)
    }, 2000);
}

launchRocket()
launchRocket()
launchRocket()

// now not for rockets but anything: wrapper function debounce, to debounce any function we wish not just custom made rocket

function debounce(fn, delay) {
    let timer
    return (anything)=>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(anything)
        }, delay)
    }
}

function launchCar(what) {
    console.log(`${what} is up`)
}

let debouncedLaunchedCar = debounce(launchCar, 2000)
debouncedLaunchedCar('Ship 🚢')
debouncedLaunchedCar('Ship 🚢')
debouncedLaunchedCar('Ship 🚢')


/*
simple example:
function debounce(fn, delay) {
    let timeoutId;  // Stores the timer reference

    return function (...args) {
        clearTimeout(timeoutId);  // Reset the timer on every call
        timeoutId = setTimeout(() => fn(...args), delay);  // Wait and execute
    };
}

const debouncedLog = debounce(() => console.log("Action executed!"), 2000);

debouncedLog();  // Call 1
debouncedLog();  // Call 2 (Resets timer)
debouncedLog();  // Call 3 (Resets timer again)

setTimeout(debouncedLog, 2500); // ✅ Finally executes after 2s of inactivity
*/

/*
const tryingToUnderstand = (fn, delay) => {
    return (...args) => {
        setTimeout(() => {
            fn(...args)
        }, delay);
    }
}
fn goes in a queue because of setTimeout api, so will execute only after the global execution context of tryingToUnderstand is over. so for that we need to attach context with it using apply. [it loses its original context (this) if it relies on this, That's why, in some cases, you'd need .apply(this, args) to explicitly bind this.]
...args when passed as returned function's parameter is saying 'collect all the arguments in an array called args.
...args when passed as parameter of fn is saying 'spread the args array into individual arguments'.

const tryingToUnderstand = (fn, delay) => {
    return (...args) => {
        fn(...args)
        setTimeout(() => {
        }, delay);
    }
}
here fn doesn't need call,bind,apply cause the execution context when it runs will be in same callsatck as of tyringToUnderstand function.
*/