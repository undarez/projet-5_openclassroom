

let cart = JSON.parse(localStorage.getItem("object"));

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

    let article = `<article class="cart__item" data-id="${cart[i]._id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                    <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${cart[i].name}</h2>
                      <p>${cart[i].color}</p>
                      <p>${cart[i].price} €</p>
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

    totalQuantity.innerText = totalArticlesQuantity;
    totalPrice.innerText = totalArticlesPrice;
    
    updateQuantity();
    deleteItemCard();
    
  }
}
// on appelle la fonction qui rempli la page

showCart();



// Mise à jour de la quantité de l'article
function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  console.log(quantityInputs)
  quantityInputs.forEach(async(quantityInput) => {
   let currentProductPrice = await getProductPriceById(quantityInput.getAttribute("data-id")).then(
    data => data
   )
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("object");
      let items = JSON.parse(cartItems);
      let newQuantity = 0;
      let newPrice = 0;
      newQuantity += parseInt(inputValue);
            totalQuantity.innerText = newQuantity;
      newPrice += parseInt(currentProductPrice * newQuantity)
      totalPrice.innerText = newPrice;
      

      //   console.log(totalPrice);

// console.log(inputValue)
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
      localStorage.setItem("object", itemsStr);
      // updateCart();
    });
  });
}

// On récupère le prix de l'article suivant son id dans la l'API avec l'artId
async function getProductPriceById(artId) {
  return fetch(`"http://localhost:3000/api/products/${artId}"`)
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
  let cartItem = JSON.parse(localStorage.getItem("object"));
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
        localStorage.setItem("object", JSON.stringify(cartItem));
        alert("Article supprimé avec succès");
      }

      const card = deleteButton.closest(".cart__item");
      card.remove();
      // updateCart();

      const deleteKanap = JSON.parse(localStorage.getItem("object"));
      if (deleteKanap.length === 0) {
        localStorage.removeItem("object");
        alert('Panier vide, retour à l\'accueil.');
        window.location.href = "index.html";
      }
    });

  });
}


// Fonction Recalcul du montant total du panier, lors de la modification de la quantité ou de la suppression d'un article

function recalculTotalPrice() {
  let newTotalPrice = 0;
  //(1) On fait une boucle sur le productRegisterInLocalStorage et dans cette boucle, 
  for (const item of cart) {
    const idProductsLocalStorage = item.idProduct;
    const quantityProductsLocalStorage = item.quantityProduct;
    //(2) on vérifie si l'id correspond
    const findProducts = mesProduits.find((element) => element._id === idProductsLocalStorage);
    //console.log(findProducts);
    //(3) et si c'est le cas, on récupère le prix.
    if (findProducts) {
      const newTotalProductPricePanier = findProducts.price * quantityProductsLocalStorage;
      newTotalPrice += newTotalProductPricePanier;
      console.log("Nouveau prix total panier", newTotalPrice);
    }
    //On affichage le nouveau prix total du panier dans le html
    document.getElementById("totalPrice").innerHTML = newTotalPrice;
  }
  return
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

// // Déclarer une class avec constructor pour le formulaire

let User = {
  firstName: "",
  lastName: "",
  adresse: "",
  city: "",
  email: ""
}

// // adresser une class a l'objet
class user {
  constructor(firstName, lastName, adresse, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.adresse = adresse;
    this.city = city;
    this.email = email;
  }
}

// // Récupération des données du user dans le local storage
const userInstorage = JSON.parse(localStorage.getItem('user'));


// on efface le contenue du localStorage
const ClearCart = () => {
   // Suppression des informations de panier stockées dans localStorage
  document.querySelectorAll(".deleteItem").addEventListener('clik',()=>{
    console.log(ClearCart)
  })
}

const userDirect = new user();

inputFirstName.addEventListener('input', (e) => {
  userDirect.firstName = e.target.value;
});
inputLastName.addEventListener('input', (e) => {
  userDirect.lastName = e.target.value;
});
inputAddress.addEventListener('input', (e) => {
  userDirect.adresse = e.target.value;
});
inputCity.addEventListener('input', (e) => {
  userDirect.city = e.target.value;
});
inputEmail.addEventListener('input', (e) => {
  userDirect.email = e.target.value;
});


orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('user', JSON.stringify(userDirect));
  // preventdefault => suppression de l'event par default
  // window.localStorage.removeItem('object')
  window.localStorage.clear()
  window.location.href = 'confirmation.html';
  ClearCart()
});



