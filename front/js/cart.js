

let cart = JSON.parse(localStorage.getItem("cart"));

let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

async function showCart() {

  for (let i = 0; i < cart.length; i++) {
    let price = await getProductPriceById(cart[i]._id);

    totalArticlesQuantity += parseInt(cart[i].qte);
    totalArticlesPrice += parseInt(cart[i].qte * price);
    // ici ont ajoute tous les elements d'affichage de l'api pour que cela fonctionne qui appartienne au locale storage
    let article = `<article class="cart__item" data-id="${cart[i]._id}" data-color="${cart[i].color}">
    <div class="cart__item__img">
    <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
                      <h2>${cart[i].name}</h2>
                      <p>${cart[i].color}</p>
                      <p>${price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${cart[i].qte} </p>
                    <input  data-id="${cart[i]._id}" data-color="${cart[i].color}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].qte}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p  data-id="${cart[i]._id}" data-color="${cart[i].color}" class="deleteItem">Supprimer</p>
                    </div>
                    </div>
                    </div>
                    </article>`;

    articles.innerHTML += article;
    // les deux ligne suivante permet de faire l'affichage sur le site donc envoyer du contenue html
    totalQuantity.innerText = totalArticlesQuantity;
    totalPrice.innerText = totalArticlesPrice;


  }
  updateQuantity();
  deleteItemCard();

}
// on appelle la fonction qui rempli la page

showCart();


// Mise à jour de la quantité de l'article
function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  console.log(quantityInputs)
  quantityInputs.forEach(async (quantityInput) => {
    let currentProductPrice = await getProductPriceById(quantityInput.getAttribute("data-id")).then(
      data => data
    )
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cart");
      let items = JSON.parse(cartItems);
      let newQuantity = 0;
      let newPrice = 0;
      newQuantity += parseInt(inputValue);
      totalQuantity.innerText = newQuantity;
      newPrice += parseInt(currentProductPrice * newQuantity)
      totalPrice.innerText = newPrice;


      //   console.log(totalPrice);

      // console.log(inputValue)

      // ci ont creer un map donc qui crée un tableau pour récupérer les elements sans supprimer ce qui y a a l'interieur
      items = items.map((item, index) => {
        if (item._id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      if (inputValue > 100 || inputValue < 1) {
        alert("La quantité doit etre comprise entre 1 et 100");
        return;
      }
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cart", itemsStr);
      // updateCart();
    });
  });
}

// On récupère le prix de l'article suivant son id dans la l'API avec l'artId
async function getProductPriceById(artId) {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log("erreur");
    })
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i]._id == artId) {
          return response[i].price;
        }
      }
    });
}


// Suppression de l'article choisi
function deleteItemCard() {
  let cartItem = JSON.parse(localStorage.getItem("cart"));
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      cartItem = cartItem.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteConfirm == true) {
        localStorage.setItem("cart", JSON.stringify(cartItem));
        alert("Article supprimé avec succès");
      }

      const card = deleteButton.closest(".cart__item");
      card.remove();
      updateCart();
    });

  });
}


// récupérer les elements pour formulaire

//Récupération des coordonnées du formulaire client et mise en variable
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
let orderBtn = document.getElementById('order');
// //Déclaration des variables pour vérifier la bonne valeur des champs du formulaire


// // adresser une class a l'objet
class user {
  constructor(firstName, lastName, adresse, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.adresse = adresse;
    this.city = city;
    this.email = email;
  }
} console.log(user)

// // Récupération des données du user dans le local storage
const userInstorage = JSON.parse(localStorage.getItem('user'));

// on efface le contenue du localStorage
// const ClearCart = () => {
//   // Suppression des informations de panier stockées dans localStorage
//   document.querySelectorAll(".deleteItem").addEventListener('clik', () => {
//     console.log(ClearCart)
//   })
// }
// appel au fetch pour retourner le formulaire sur confirmation:

 function sendForm(){
  const containedForm = document.querySelector(".cart__order__form");

  containedForm.addEventListener("submit",  function (e){
    e.preventDefault();
// appel a l'objet valueForm pour tous les element de l'utilisateur sur le form
    const valueForm = {
      firstName:(e.target.querySelector("[name=firstname]").value),
      lastName:(e.target.querySelector("[name=lastName]").value),
      address:(e.target.querySelector("[name=address]").value),
      city:(e.target.querySelector("[name=city]").value),
      email:(e.target.querySelector("[name=email]").value),
    }
    console.log(e)
    //  creation de la charge utile en JSON
    const ChargeForm = JSON.stringify(valueForm);
    // appel de fetch
    fetch("http://localhost:3000/api/products/")
    .then((res)=> res.json())
    .then((data) => {
      // création d'un tableau d'article
      let productTabs = []
      //transformer le tableau
      let transformTab = JSON.stringify({productTabs, valueForm})
      // ajout de l'objet valueForm et des identifiants des produits au tableau
      for(let productTab of productTabs){
        productTab = push(productTabs._id)
      }
      console.log(transformTab)
      console.log(productTabs)

      async function send (order){
        // appel de l'API
        let reponse = await fetch("http://localhost:3000/api/products/order",{
          method:"POST",
        headers: {"content-type": "application/Json"},
        body: transformTab, ChargeForm
        });
        if (reponse.ok){
          // reponse du serveur
          const result = await reponse.json(order)
          localStorage.removeItem(sendForm)
          window.location.href =`http://127.0.0.1:5501/front/html/confirmation.html?orderID=${result.orderId}`
        }else{
          alert("cela ne fonctionne pas")
        }
      }


      
      send()
    })


    // const response = await fetch("http://localhost:3000/api/products/",{
    //   methode:"POST",
    //   headers: {"content-type": "application/Json"},
    //   body: ChargeForm
    // })
    // const data = await response.json();
    // console.log(data);
    // if(data.order){
    //   data.order = true

    //   console.log(data.order)
    // }else {
    //   alert("le code ne fonctionne pas")
    // }
  })  
  sendForm()
  }
  // orderBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   localStorage.setItem('user', JSON.stringify(valueForm));
  //   // preventdefault => suppression de l'event par default
  //   window.localStorage.removeItem('cart')
  //   window.localStorage.clear()
  //   window.location.href = 'confirmation.html';
  //   ClearCart()
  // })
// object qui appel les info de l'utilisateur qu'il renseigne valueForm
  



// const Validate = (object, input) => {
//   const error = form.querySelector(`#${object}ErrorMsg`)
//   error.textContent = ''
//   return userDirect[object].every((constraint) => {
//     if (!constraint.test(input.value)) {
//       error.textContent += constraint.message
//       return false
//     }
//     return true
//   })
// }

// // declaration d'un fetch pour utiliser orderId pour generer un id de commande
// const Order = document.querySelector(".cart__order__form")
// async function postOrder(url, data = {}) {
//   const response = await fetch(url, {
//     method: 'POST',
//     Headers: {
//       // les trois ligne indique que le fetch accpete l'application json
//       "content/type": "application/json",
//       "cache": "*default"
//     },
//     body: JSON.stringify(data)
//   })
//   // si a l'ouverture de l'api c'est bon donc return 200
//   if (response.ok === true) {
//     return response.json();
//   }
//   throw new error("Impossible de contacter le serveur")

// }
// // une boucle for pour aller chercher dans userdirect tous les name qui sont dans le formulaire sur le html de cart.html puis ont lui demande une validation a chaque ajout dans le formulaire par lutilisateur
// for (const object in userDirect) {
//   const input = Order.querySelector(`[name="${object}]`)
//   input.addEventListener("change", (event) => {
//     Validate(object, input)
//   })

// }

// // submit= faire parvenir donc ont demande de faire parvenir la liste du formulaire nommer order apres le retour de la reponse async
// // avec une suppression par default des event default
// Order.addEventListener('submit', async (event) => {
//   event.preventDefault()

//   if (Object.keys(userDirect).every((object) => Validate(object, Order.querySelector(`[name="${object}"]`)))) {
//     const data = await userDirect.order(
//       {
//         firstName: userDirect.querySelector('[name="firstName"]').value,
//         lastName: userDirect.querySelector('[name="lastName"]').value,
//         address: userDirect.querySelector('[name="address"]').value,
//         city: userDirect.querySelector('[name="city"]').value,
//         email: userDirect.querySelector('[name="email"]').value
//       })

//     orderBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       localStorage.setItem('user', JSON.stringify(userDirect));
//       // preventdefault => suppression de l'event par default
//       // window.localStorage.removeItem('object')
//       window.localStorage.clear()
//       window.location.href = 'confirmation.html';
//       ClearCart()
//       postOrder(`http://localhost:3000/api/products/order=${data.orderId}`)
//     });
//   }



// })




