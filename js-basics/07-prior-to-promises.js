/*
You can make a code aysnchronous using callbacks prior to concept of promises.
*/

const { countReset } = require('console')
const fs = require('fs')
let content = fs.readFileSync('./callback.md', 'utf-8')
console.log(content)
// the readFileSync() runs it synchronously i.e., it waits for it to complete before executing print statement.

// but this makes my program slower if file was large, so I want to run it asynchronously and I don't have promises.

function load(cb) {
    const fs = require('fs')
    let content = fs.readFile('./async-sync.md', 'utf-8')
    return cb(content)
}
load((cont)=>{
    return console.log(cont)
})