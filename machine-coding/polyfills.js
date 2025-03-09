//A JavaScript polyfill is a piece of code that allows older browsers to use modern JavaScript features. These features are manually implemented.

// foreach()
if(!Array.prototype.forEach){
    Array.prototype.forEach = function (cb) {
        for(let i = 0; i < this.length; i++){
            cb(this[i], i)
        }
    }
}

// map()
if(!Array.prototype.map){
    Array.prototype.map = function (cb) {
        const arr = []
        for(let i = 0; i < this.length; i++){
            const updatedValue = cb(this[i], i)
            arr.push(updatedValue)
        }
        return arr
    }
}

// filter()
if(!Array.prototype.mfilter){
    Array.prototype.mfilter = function (cb) {
        const arr = []
        for(let i = 0; i < this.length; i++){
            cb(this[i], i)
            if(cb(this[i],i)){
                arr.push(this[i])
            }
        }
        return arr
    }
}

let arr = [1,2,3,4,5]
let newarr = arr.mfilter((e)=>e>3)
console.log(newarr);

// reduce()
if(!Array.prototype.mreduce){
    Array.prototype.mreduce = function (cb,initialValue) {
        if(arguments.length < 2){
            let acc 
            let currValue
            for(let i = 0; i < this.length - 1; i++){
                acc = acc === undefined ? this[i] : acc
                currValue = this[i+1]
                acc = cb(acc, currValue)
            }
            return acc
        } else {
            let acc
            let currValue
            for(let i = 0; i < this.length; i++){
                acc = acc === undefined ? initialValue : acc
                currValue = this[i]
                acc = cb(acc, currValue)
            }
            return acc
        }
    }
}

let result = arr.mreduce((acc,currvalue)=>acc+currvalue, 0)
console.log(result);

/*
refactoring reduce: DRY principle, cleanup

if(!Array.prototype.mreduce){
    Array.prototype.mreduce = function (cb,initialValue) {

        let acc = (arguments.length > 1) ? initialValue : this[0]
        let startIndex = (arguments.length > 1) ? 0 : 1

        for(let i = startIndex; i < this.length; i++){
            acc = cb(acc, currValue)
        }
        return acc
    }
}

*/

// promise() 💀

/*
- jaise hi promise ka obj banne ek executor function do
- executor function (callback) has resolve and reject
- resolve ko call krne pe:
    - promise fulfill
    - saare .then call
- reject ko call krne pe:
    - promise rejected
    - saare .catch call
- finally to har bar call hota
*/

class myPromise {
    constructor(executorFn){
        this._state = 'pending' // '_' before variables is a notation for dev to mark this as private as JS doen't really support encapsulation
        this._successCallbacks = []
        this._rejectCallbacks = []
        this._finallyCallbacks = []
        executorFn(this.resolveFn.bind(this),this.rejectFn.bind(this))
    }

    then(cb){
        this._successCallbacks.push(cb) // registering
        return this
    }

    catch(cb){
        this._rejectCallbacks.push(cb)
        return this
    }

    finally(cb){
        this._finallyCallbacks.push(cb)
        return this
    }

    resolveFn(value){
        this._state = 'fulfilled'
        this._successCallbacks.forEach((cb)=>cb(value))
        this._finallyCallbacks.forEach((cb)=>cb())
    }
    
    rejectFn(err){
        this._state = 'rejected'
        this._rejectCallbacks.forEach((cb)=>cb(err))
        this._finallyCallbacks.forEach((cb)=>cb())
    }
}