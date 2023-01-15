// ici nous allons creer plusieur functions qui permet 
// 1: sauvegarder l'article dans le panier
// 2: gerer le panier vide
// 3: Ajouter un article dans le panier
// 4: Retirer un article du panier
// 5: Changer la quantiter de l'article
// 6: Calculer la quantiter total des produits dans le panier ainsi que de return le panier a 0
// 7: Calculer le prix total 

// utilisation de localstorage qui sert a stocker des elements pour les utiliser en les convertissant exemple json.stringify transform et prend l'objet pour le transformer en chaine de caractere

// json.parse prend la chaine de caractere pour la transformer en objet.

// appel des id 
// const quantityTotal = document.getElementById()
// creer une variable qui contient le code html du panier qui débute a la ligne 102
let configPanier = document.getElementById("cart__items");



// ========1 sauvegarder le produit
function savecanape(canape){
    localStorage.setItem("canape", json.stringify(canape)) 
    // set item sert a stockerchaque element
}


// ========2 gerer le panier vide

function panier(){
    let canape = localStorage.getItem("canape");
    if(canape == null){
        return[]
    }else{
        return json.parse(canape)
    }
    // get item sert a recuperer l'element
}

// ========3 ajouter un produit au panier
// utilisation de find qui est une function qui cherche dans un tableau s'il existe un argument qui correspond avec la condition

function addcanape(product){
    let canape = panier()
    let foundProduct = canape.find(p=>p.id == product.id)
    if (foundProduct != undefined){
        foundProduct.quantity++;
    } else canape.product = 1;
    canape.push(product);
    savecanape(canape)
} 

// ========4 retirer article du panier
// La méthode Array.prototype.filter() est une méthode de l'objet Array qui crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition spécifiée. La méthode filter() prend en argument une fonction de filtre qui est invoquée pour chaque élément du tableau. Lorsque la fonction de filtre renvoie true pour un élément donné, cet élément est inclus dans le nouveau tableau. Sinon, il est ignoré.

function removeFromCanape(product){
    let canape = panier();
    canape = canape.filter(p=>p.id != product.id); 
    savecanape(canape);
}




// ========6 calculer la quantiter

function getNumberProduct(){
    let canape =panier();
    let number = 0;
    for(let product of canape){
        number += product.quantity;
        return number;
    }
}


// ========7 calculer prix total

function getTotalPrice(){
    let canape = panier();
    let total = 0;
    for(let product of canape){
        total += product.quantity * product.price
    }
    return number;
}

// cree une variable pour aller chercher le localstorage
const dataCart = JSON.parse (localStorage.getItem("object"))
console.log(dataCart)


// creer un edventlistener pour supprimer l'article du panier
// variable qui récupere le boutton supprimer article
// const deleteItem = document.querySelector(".deleteItem")

// deleteItem.addEventListener("click", () => {
//     // récuperer l'article a supprimer
//     const cart__items = document.getElementById("cart__items")
//     // supprimer l'article utiliser la metode remove
//     cart__items.remove();

//     console.log(cart__items)
// })

// ajout du text html article page cart.html
// le dataCart es le localstorage le JSON.parse permet de le transformer un objet
let inputQty;
for( let i= 0; i< dataCart.length; i++){
    configPanier.innerHTML += `
     <article class="cart__item" data-id="${dataCart[i]._id}" data-color="{product-color}">
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
          <p id="qty" >Qté : ${dataCart[i].qte} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> `

    
    
    
    // ici je fait appel a eventlistener avec la fonction change qui permet a l'utilisateur de changer les qauntiter du panier target crée un nouvel objet avec une nouvelle valeur 
    
    // puis le datacart es transformer en chaine de caracterer pour etre renvoyer dans le local storage grace a setitem.
    
    const currentInpQty = document.querySelector(".itemQuantity")
    inputQty = currentInpQty 
    const objectQty = document.querySelector("#qty")

    currentInpQty.addEventListener('change', function (event) {
        objectQty.innerHTML = ` <p id="qty" >Qté : ${event.target.value} </p>`
        const dataCart = JSON.parse (localStorage.getItem("object"))

    
        console.log(dataCart)
        
    })
    
} 
console.log(inputQty.value)

// total d'article dans le panier

const inlocalStorage = JSON.parse(localStorage.getItem("object"))

let totatQty = 0

for(let item of inlocalStorage){
    totatQty += item.quantity
}

// prix total dans le panier

const totalQuantity = document.getElementById("totalQuantity")
totalQuantity.innerHTML = totatQty


console.log(totatQty)


// currentInpQty = number(objectQty.value)
// objectQty.addEventListener("change", (event)=>{
//     inputQty = number(event.target.value)
//     objectQty.innerHTML = `Qté : ${inputQty}`;
//     Object.find((item) =>item._id === product._id).qty = inputQty
//     localStorage.setItem("object", JSON.stringify("object"))
// })

// const dataCart = JSON.stringify (localStorage.setItem("object"))
