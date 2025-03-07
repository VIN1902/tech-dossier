/*
You can make a code aysnchronous using callbacks prior to concept of promises.
*/

console.log("Sync Start")
const fs = require('fs')
let content = fs.readFileSync('../README.md', 'utf-8')
console.log(content)
console.log("Sync end")
// the readFileSync() runs it synchronously i.e., it waits for it to complete before executing print statement.

// but this makes my program slower if file was large, so I want to run it asynchronously and I don't have promises.

console.log('Async Start')
fs.readFile('../README.md', 'utf-8', (err, data)=>{
    if (err) {
        console.log("Error occured: ", err)
    } else {
        console.log("Success: ", data)
    }
})
console.log('Async End')

/*
# How Async code is handled by JS runtime environment using a single thread:
1. console.log('Async Start') executes – It prints immediately.
2. fs.readFile() is called – Since fs.readFile is an asynchronous operation handled by Node's I/O APIs, it is offloaded to the Node.js internal I/O thread pool.
3. Callback Registration – Node.js registers the callback (err, data) => { ... }, and the fs.readFile() function completes its setup, then control moves to the next line.
4. console.log('Async End') executes – Since the event loop does not wait for the I/O operation to complete, this line executes immediately after fs.readFile().
5. I/O Completion – Once the file read operation is completed, its callback is placed in the callback queue (task queue).
6. Event Loop Execution – The event loop checks if the call stack is empty. After 'Async End' is printed, the stack is clear, so the callback from the task queue is pushed to the stack.
7. Callback Execution – The callback runs, printing either "Error occurred: ..." if an error happens or "Success: {data}" if the file read succeeds.
*/

/*
Why not assign the return of callback of readFile() 'a async fnx' to some variable?
like: let content = readFile('./file','utf-8',cb) and then console.log(content)

by the time readFile()'s callback completes its journey in node and in waiting time in queue, and when finally it gets a chance to come into callstack, the entire global execution context is gone! That means even the value of 'content' what it was (undefined) also does not exist anymore! Heck 'content' itself doen't exist!
Async functions don’t return values immediately.
By the time fs.readFile() finishes, the global execution context is gone.
Variables like 'content' won’t hold the file data.
*/

// comment below code to understand purely the upper part

// convert this blocking code into async:
console.log('Sync add Start');
function add(a,b) {
    return a+b
}
let r1 = add(1,2)
console.log(r1)
console.log('Sync add end');

//async version:
console.log('Async add start');
function asyncAdd(a,b,cb) {
    setTimeout(()=>{
        cb(a+b);
    }, 3000)
}
asyncAdd(1,3,(output)=>{console.log(output)})
console.log('Async add end');

/*
Task:
1. read a file
2. create a new file and copy its content
3. delete the file

fs.readFile('sample.txt', 'utf-8', (err, data)=>{
    if(err){
        console.log('read krne mei erro aagya',err);
    } else {
        console.log('ye lo file read hogyi', data);
        fs.writeFile('backup.txt', data, (err)=>{
            if(err){
                console.log('write krne mei error agya',err);
            } else {
                fs.unlink('sample.txt', (err)=>{
                    if(err){
                        console.log('delete krne mei error agya',err);
                    } else {
                        console.log('ye lo hogya delete');
                    }
                })
            }
        })
    }
})

WHAT IS CALLBACK HELL?
when tasks are dependent upon execution of some prior task then to make the newer task execute asynchronously we need to call a callback within a callback.
Callback hell happens when async tasks depend on each other, leading to deep nesting.
This results in poor readability and any more task added only adds to the problem.
*/

/*
USING PROMISRES TO SOLVE CALLBACK HELL

const newfs = require('fs/promises')
newfs
    .readFile('sample.txt','utf-8')
    .then((data)=> newfs.writeFile('backup.txt', data))
    .then(()=> newfs.unlink('sample.txt'))
    .catch((err)=> console.log('error agya agar kisi bhi step mei', err))
*/

// Promises is also doing callback stuff but its whole gimmick is that unlike async fn that depend only on callbacks, promises enabled async fn give us a promise as an Immediate value.
// So using this immediate value the program can run synchronously as it wanted to by design (and also the readability perks)