# Call stack, browser, event loop and callback queue HLD (high level design)
- The V8 engine, the thing that 'runs' JS, is actually just the 'call stack'.
- 'call stack' takes a function, executes it and then removes it to execute next one immediately (LIFO)
- 'call stack' also does NOT wait for anything -> very impatient. So in theory function like setTimeout() shouldn't even work right?
- actually core JS does not have anything like setTimeout(), this method was created by browser for its own 'window' object
- what 'window.setTimeout( ()=>{}, delay )' actually does is:
    1. all the code/functions inside callstack written by coreJS are getting executed immediately, its just that as soon as it saw a setTimeout() it gave its reponsiblity to browser and itself moved on to execute next code in order asap. (after executing everything callstack is now free)
    2. browser starts an internal clock and registers the callbackFn code inside itself.
    3. browser from its registered mem, gives that callbackFn to 'callback queue', after browser's clock countdown is over. (browser is now free)
    4. eventLoop keeps checking if callback queue has something or not AND if callstack is empty/free at the moment, if both are true then it sends that to callstack.
    5. now callstack again gets busy and tries to execute that code immediately asap. (after that callstack again free)
- what about case of setTimeout( () => {}, 0 ) ?
    - in browser it gets done immediately (in 0s) corresponding to while callstack was executing rest
    - issue comes in event loop when it checks if callstack has something else executing after setTimeout() line, if true then it WAITS.
    - after entire callstack is empty, eventloop now sends the fn to callstack
- setTimeout( ()=>{}, 5 * 1000 ) -> says, minimum wait for 5s, but maximum waiting time depends on what is written after it in callstack and when will it get free (10s, 1hr, 2days, never, etc.)
- just like timers browser also handles promises, but promise is sent to 'micro task queue' and timers is sent to 'callback queue/task queue'
- 'micro task queue' has more priority than 'task queue'
- so event loop in total checks these:
    1. callstack if free then send content of either microTaskQueue or taskQueue (eventually both, but who first?), else hold the content in respective queues 
    2. microTaskQueue if free then send content of taskQueue to callstack, else send content of microTaskQueue to callstack
- Starvation: microTaskQueue never gets totally free so taskQueue never gets its turn to come into callstack and execute its content
- HLD = upar upar se, LLD = in depth

# About callstack (LLD)
- Hoisting: a way by which variable are loaded in memory before anything else
- whenever call stack has something, it makes a gloabal execution context
- inside GEC, we have memory phase and code phase
- in memory phase before executing any code, all the variable and functions are stored in memory
    - variables are set to undefined
    - functions are set to their entire body
- in code phase each line of code gets executed line-by-line
```js
test(); // Testing

console.log("my age is" + age); // my age is undefined

var age = 22; // 'var age' (making it exist in memory) part was done in memory phase, in code phase only the 'age = 22' part happens

function test() {
    console.log('Testing');
}
// 'test' during memory phase loads the entire function body is memory (hoisting) and in code phase this fuction declaration part is meaningless

console.log("my age is" + age); // my age is 22
// hoisting made it seem like (only appears to be) the declaration part to the top. but in reality gloabal execution context is the culprit
```
- 'let' and 'const' also get hoisted like 'var' but a concept comes of Temporal Dead Zone
- TDZ:
    - at whatever line number you declare using let/const, above that is considered dead zone
    - in dead zone you can't access those variables, throws error