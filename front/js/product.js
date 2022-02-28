//recuperer l'id
const querryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(querryString_url_id);

const productId = urlSearchParams.get("id");

//recuperer l'information sur le produit//


fetch(`http://localhost:3000/api/products/${productId}`).then((response)=>{
    return response.json();
}).then((product)=>{
    const itemContent = document.querySelector(".item__content");
    const produitStructure = `
    
        <div class="item__img">
            <img src=${product.imageUrl} alt=${product.altTxt} />
        </div>
        <div class="item__content__titlePrice">
            <h1 id="title">${product.name}</h1>
            <p>Prix : <span id="price">${product.price}</span>€</p>
        </div>
        <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">${product.description}</p>
        </div>
        <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
        </div>
        
        

`;



itemContent.insertAdjacentHTML("afterbegin" ,produitStructure);

document.querySelector("#colors").insertAdjacentHTML("beforeend", `

    ${product.colors.map((color)=>{
        
        return `<option  value=${color}>${color}</option>`;

    })}

`);

});

//----Le Panier----корзина//
//Récuperation des données получение данных//
//ID selection выбор id//

const idForm = document.querySelector("#colors");
console.log(idForm);




 //Button de panier selection кнопка корзины//
const btn_Panier = document.querySelector("#addToCart");
console.log(btn_Panier);

// button добавление //
btn_Panier.addEventListener("click", (event)=>{
    event.preventDefault();
//le Choix d'utilisateur var выбор пользователя//
const choisForm = idForm.value;
    console.log(choisForm);   

     //Recuperation des valeurs получение значений//
// let productOption = {
//     name: productId.name,
//     colors: choisForm, 
//     price: productId,
//     idProduct: productId._id,
//     quantite:
// }

});







