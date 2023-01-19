// ici nous allons creer plusieur functions qui permet 
// 1: sauvegarder l'article dans le panier
// 2: gerer le panier vide
// 3: Ajouter un article dans le panier
// 4: Retirer un article du panier
// 5: Changer la quantiter de l'article
// 6: Calculer la quantiter total des produits dans le panier ainsi que de return le panier a 0
// 7: Calculer le prix total 


const currentInpQty = document.querySelector(".itemQuantity")
// itemQuantity est la class de l'input

const objectQty = document.querySelector("#qty")
// #qty est l'id de p pour dire que c'est la quantité de l'article

// cart__item est la section de l'article
const inLocalStorage = JSON.parse(localStorage.getItem("object"));
const dataCart = JSON.parse(localStorage.getItem("object"))
// le datacart est le text manquant puis le parse transforme le texte en objet

let inputQty
// inputQty est la variable qui va dans le localStorage

// dataCart [appel les elements a remplacer qui ce trouve dans le local en forme de tableau ici c'est i ]
let configPanier = document.getElementById("cart__items");
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

    const API_URL = `http://localhost:3000/api/products/`;
    let totalPrice = 0;
    let totalQte = 0;
    // let qte = localStorage.getItem("qte")
    
    // créer un tableau de promesses pour chaque produit
    const promises = inLocalStorage.map(item => fetch(`${API_URL}/${item._id}`).then(response => response.json()));
    
    // promise.all permet de contenir tout les prix et calcule le tous dans ce cas apres elle renvoie tous dans la case definie.
    
    Promise.all(promises)
    .then(data => {
      //calculer le prix total pour chaque produit
      for (let item of inLocalStorage) {
        const product = data.find(p => p._id === item._id);
        totalPrice += product.price * item.qte;
        totalQte += item.qte
      }
      //mettre à jour l'élément HTML
      const totalArticleQte = document.getElementById("totalQuantity")
      const totalPriceElement = document.getElementById("totalPrice");
      
      function updateQuantity(){
        
        const tousArtticles = document.querySelectorAll(".itemQuantity")
        console.log(tousArtticles)
        // mise a jour de la quantité de l'article
        tousArtticles.forEach((tousArtticle)=>{
          
          tousArtticle.addEventListener('change',(event)=>{
            event.preventDefault();
            // event.target demande un retour sur l'evenement qui a eu leu c'est a dire change
            const inputValue = event.target.value
            // ici l'envent target demande un retour sur le data id qui ce trouve dans le config panier de l'article plus haut de ce fichier
            const dataId = event.target.getAttribute("data-Id");
            const dataColor = event.target.getAttribute("data-color");
            // appel du local storage
            const inLocalStorage = localStorage.getItem("object");
            // const inLocalStorage = localStorage.getItem("object");
            let items = JSON.parse(inLocalStorage);
            items =items.map((item, index)=>{
              if (item.id === dataId && item.color === dataColor){
                item.quantity = inputValue
              }
              return item
            })
            if (inputValue > 100 || inputValue < 1) {
              alert("La quantité doit etre comprise entre 1 et 100");
              return;
            }
            let itemsStr = JSON.stringify(items);
            localStorage.setItem("object", itemsStr);
            // updateCart();          
          })
        })
      }
      
      updateQuantity();
      totalPriceElement.innerHTML = totalPrice;
      totalArticleQte.innerHTML = totalQte;
            console.log(totalPrice);
            console.log(totalQte)
        })
      
        //  mise a jour du panier dynamique
        // creer une function qui permet d'appeler le local storage 
        
        // ce que l'on a besoin petit rappel totalQuantity = 0 la quantité
        // totalPrice = 0 le prix
        // appeler le local avec l'article donc ici c'est object


        
      }
      
      // Mise à jour du panier dynamique
async function updateCart() {
  let cartItem = JSON.parse(localStorage.getItem("object"));
  let totalQuantity = 0;
  let totalPrice = 0;
  
  for (i = 0; i < cartItem.length; i++) 
  {      
      let price = await getProductPriceById(dataCart[i].id);
      totalQuantity += parseInt(cartItem[i].quantity);
      totalPrice += parseInt(price * cartItem[i].quantity);                  
  }
  
  console.log(totalPrice);

  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
}



      // async function updateCart() {
      //   let cartItem = Json.parse(localStorage.getItem("object"))
      //   let totalPrice = 0;
      //   let totalQuantity = 0;
      
      //   for (i = 0; i< data.length; i++){
      //     // creer une variable qui récupere l'id de l'article avec le datacart 
      //     let elementCart = await getProductPriceById(dataCart[i]._id)
      //     // La fonction parseInt() en JavaScript est utilisée pour convertir une chaîne de caractères en un nombre entier.
      //     totalQuantity += parseInt(cartItem[i].qte);
      //     totalPrice += parseInt(price * cartItem[i].qte)
      //   }
      //   console.log(totalPrice)
      // }
      // updateCart();