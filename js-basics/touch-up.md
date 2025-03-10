# closure
- tiffin concept:
    - bache ko tiffin pack krke degi mummy
    - means mummy ke paas jo h vo bache ke pas bhi jayega
    - bacha = return function, mummy = parent function, mummy's stuff = variables
```js
function parent(){
    let lunch
    return child(){
        lunch = 'yum'
    }
}
```
# Timers
- good practice = store their reference in memory inside a variable
```js
let timerId = setTimeout(()=>{},1000)
```