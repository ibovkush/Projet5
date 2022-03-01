//recuperer l'id
const querryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(querryString_url_id);

const productId = urlSearchParams.get("id");

const localStorageCartKey = "p5_cartData";

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


    //----Le Panier----корзина//
    //Récuperation des données получение данных//
    //ID selection выбор id//

    const colorSelect = document.querySelector("#colors");
    const quantityInput = document.querySelector("#quantity");


    //Button de panier selection кнопка корзины//
    const btn_Panier = document.querySelector("#addToCart");
    console.log(btn_Panier);

    // button добавление //
    btn_Panier.addEventListener("click", (event)=>{
        event.preventDefault();
        // if user didn't selected options - do nothing.
        if (!colorSelect.value || quantityInput.value == 0) {
            return;
        }
        //le Choix d'utilisateur var выбор пользователя//
      
            //Recuperation des valeurs получение значений//
        let productOption = {
            name: product.name,
            imageUrl:product.imageUrl,
            color: colorSelect.value, 
            price: product.price,
            id: productId,
            quantity: quantityInput.value * 1
        };

        let cartData = []
        
            //get data from local storage and set it as empty array if it's not exist
            // then try to parse saved string as array
        try {
            const savedCartData = localStorage.getItem(localStorageCartKey) || "[]";
            cartData = JSON.parse(savedCartData);
            
        } catch (error) {
            
        }
        
        // check if product with same id and color already exist in cart - then just increase quantity
        let isExist = false;
        for (let index = 0; index < cartData.length; index++) {
            const product = cartData[index];
            if (product && product.id && product.color === productOption.color && product.id===productOption.id) {
                product.quantity = product.quantity ? product.quantity += productOption.quantity : productOption.quantity;
                isExist = true;
                break;
            }
        }

        // if not exist - add it to cart as is
        if (!isExist) {
            cartData.push(productOption);
        }

        // save cart to local storage
        localStorage.setItem(localStorageCartKey, JSON.stringify(cartData));


    });

});








