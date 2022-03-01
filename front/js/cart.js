
const localStorageCartKey = "p5_cartData";

let cartData = []
        
//get data from local storage and set it as empty array if it's not exist
// then try to parse saved string as array
try {
    const savedCartData = localStorage.getItem(localStorageCartKey) || "[]";
    cartData = JSON.parse(savedCartData);

} catch (error) {

}

console.log(cartData);

let items = '';
let totalQuantity = 0;
let totalSum = 0;
cartData.forEach(product => {

  items += `
    <div style="display:flex;">
        <div class="item__img">
            <img style="width:250px;" src=${product.imageUrl} alt=${product.name} />
        </div>
        <div class="item__content__titlePrice" style="margin-left:20px;">
            <h4 id="title">${product.name}</h1>
            <p>Couleur  : <span id="color">${product.color}</span>€</p>
            <p>Prix : <span id="price">${product.price}</span>€</p>
            <p>Nombre  : <span id="quantity">${product.quantity}</span>€</p>
            <p>Sum : <span id="sum">${product.quantity * product.price}</span>€</p>
        </div>
    </div>
    <hr />

`

    totalSum += product.quantity * product.price;
    totalQuantity += product.quantity;
}),

document.getElementById("cart__items").innerHTML = items;
document.getElementById("totalQuantity").innerHTML = totalQuantity;
document.getElementById("totalPrice").innerHTML = totalSum;


const form = document.querySelector(".cart__order__form");



const btn_Order = document.getElementById("order");
    console.log(btn_Order);

    // button добавление //
    btn_Order.addEventListener("click", (event)=>{
        
        // need to add check - if form is invalid - don't send request!!!!

        const ids = [];
        cartData.forEach(product=>ids.push(product.id));
    
        fetch(`http://localhost:3000/api/products/order`, {
            method:'POST',
            body:JSON.stringify({
                contact:{
                    contact:'1', // <---- all these fields should be filled with real data 
                    firstName:'1',// <---- all these fields should be filled with real data 
                    lastName:'1',// <---- all these fields should be filled with real data 
                    address:'1',// <---- all these fields should be filled with real data 
                    city:'1',// <---- all these fields should be filled with real data 
                    email:'a@a',// <---- all these fields should be filled with real data 
                },
                products:ids
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
        }).then(success=>{
            debugger;
            const a = success;
        }, error=>{
            debugger;
            const a = error;
    
        });
        return false;
       

    });
