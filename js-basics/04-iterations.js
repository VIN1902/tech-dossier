let salesData = [
    {product: 'Laptop', price: 1200},
    {product: 'Smartphone', price: 800},
    {product: 'Headphones', price: 150},
    {product: 'Keyboard', price: 80},
]

let totalSales = function (input) {
    let sum = 0;
    for(let i = 0; i < input.length; i++){
        sum += input[i].price;
    }
    return sum;
}
console.log(totalSales(salesData));
totalSales = salesData.reduce( (accumulator, currentValue)=>{return accumulator + currentValue.price}, 0 )
// currentValue stores {product: 'Laptop', price: 1200}
console.log(totalSales);

// pipe -> methods one after the another -> ex: 'vikas'.toUpperCase().slice(0,3)

//alag nikalo low stock (less than 50) valo ko
let inventory = [
    {name: 'widget A', stock: 30},
    {name: 'widget B', stock: 120},
    {name: 'widget C', stock: 45},
    {name: 'widget D', stock: 70},
]

let lowStock = inventory.filter((value)=>{
    return value.stock < 50
})
console.log(lowStock);

//using reduce alone find most active user
let userActivity = [
    {user: 'Vikas', activityCount: 45},
    {user: 'Rakshita', activityCount: 14},
    {user: 'Harsh', activityCount: 33},
]

let mostActiveUser = userActivity.reduce((maxUser, user)=>
    user.activityCount > maxUser.activityCount ? user : maxUser
)
console.log(mostActiveUser);
