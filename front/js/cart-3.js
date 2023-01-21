// nouveau depart sur le cart
// declaration d'une variable pour le localstorage 
// puis la transformer en objet
let cartItemsLocalStorage = JSON.parse(localStorage.getItem("object"))
// console.log(cartItemsLocalStorage)

// declarer une const qui contient la section dan sle html
const ProductHtml = getElementbyId("cart__items");

// declarer les const que l'on as besoin

let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

// déclarer une function qui permet de remplir la page async

async function ContenuCart(){
    for(let i = 0; i<cartItemsLocalStorage.length; i++){
        let price = await getProductPriceById(cartItemsLocalStorage[i]._id)

    }
}

// dataCart [appel les elements a remplacer qui ce trouve dans le local en forme de tableau ici c'est i ]

for (let i = 0; i < dataCart.length; i++){
    configPanier.innerHTML += `
    <article class="cart__item" data-id="${dataCart[i]._id}" data-color="${dataCart[i].color}">
   <div class="cart__item__img">
     <img src="${dataCart[i].imageUrl
        }" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>${dataCart[i].name}</h2>
       <p>${dataCart[i].color}</p>
       <p>${dataCart[i].price}€</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p id="qty" >Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataCart[i].qte}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
   </article> `
    }