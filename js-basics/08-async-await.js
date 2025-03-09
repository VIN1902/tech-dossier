// syntactical sugar over promises, cause we can run into callback hell inside .then() also

/*
async-await is used when we want to run couple of async tasks synchronously.
ex:
const newfs = require('fs/promises')
newfs
    .readFile('sample.txt','utf-8')
    .then((data)=> newfs.writeFile('backup.txt', data))
    .then(()=> newfs.unlink('sample.txt'))
    .catch((err)=> console.log('error agya agar kisi bhi step mei', err))
    .finally( ()=>console.log('everything done) )

the .then()s and after it catch and after it finally() are all async tasks but will only happen one after the other(sync)
this is called .then() chaining and its one way of achieving async running in sync.
other way is using keywords async-await

case example:
you want to fetch some data from a server and then as soon as you recieve it you want to write that data in a new file on your system
*/

// await -> means wait for promise to resolve at that line only and return its result of fullfilled state
// so if you are waiting on each line to resolve promises then you ended up having blocking code again (the og problem)
// so you wrap all these await tasks inside a async function, which on call returns us a promise and from there use .then(),.catch(),etc

// hua kuch nhi ghumke dobara promise hi use kiya for asynchronous code but this time with better readable syntax which 'looks' like all tasks are happening synchronously

const { rejects } = require('assert')
const fs = require('fs/promises')
const { resolve } = require('path')

async function doTasks() {
    const fileContent = await fs.readFile('../README.md', 'utf-8')
    await fs.writeFile('backup.md', fileContent)
    await wait(10)
    await fs.unlink('backup.md')
}
doTasks().then( ()=>console.log('all tasks done') ).catch((e)=>console.log('kahi dikat h' + e))

function wait(seconds) {
    return new Promise( (resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        },seconds*1000)
    } )
}

/*
async function doTasks() {
    try{
        const fileContent = await fs.readFile('../README.md', 'utf-8')
        await fs.writeFile('backup.md', fileContent)
        await fs.unlink('backup.md')
    } catch(err){
        console.log('error' + err)
    } finally{
        console.log('sab hogya regardless of error')
    }
}
doTasks()
*/

