let cart = JSON.parse(localStorage.getItem("cart"));
let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;
let productPrices = {}
async function showCart() {

  for (let i = 0; i < cart.length; i++) {
    let price = await getProductPriceById(cart[i]._id);
    productPrices[cart[i]._id] = price;
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
// on appelle la fonction qui rempli la page showCart

showCart();


// Mise à jour de la quantité de l'article
function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  // console.log(quantityInputs)
  quantityInputs.forEach(async (quantityInput) => {
    let currentProductPrice = await getProductPriceById(quantityInput.getAttribute("data-id")).then(
      data => data
    )
    // ajout de l'event change pour permettre à l'utilisateur de changer la quantité au cas ou il est oublier un article.
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cart");
      let items = JSON.parse(cartItems);
      let newQuantity = 0;
      let newPrice = 0;
      // parseInt permet de transformer la quantité en objet
      newQuantity += parseInt(inputValue);
      totalQuantity.innerText = newQuantity;
      newPrice += parseInt(currentProductPrice * newQuantity)
      totalPrice.innerText = newPrice;

      // ci ont creer un map donc qui crée un tableau pour récupérer les elements sans supprimer ce qui y a a l'interieur
      items = items.map((item, index) => {
        if (item._id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        console.log(item._id)
        return item;
      });
      if (inputValue > 100 || inputValue < 1) {
        alert("La quantité doit être comprise entre 1 et 100");
        return;
      }

      items.forEach((item) => {
        newQuantity += parseInt(item.quantity);
        newPrice += parseInt(item.quantity) * productPrices[item._id];
      });

      totalQuantity.textContent = newQuantity;
      totalPrice.textContent = newPrice;

      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cart", itemsStr);
    });
  });
}





//       if (inputValue > 100 || inputValue < 1) {
//         alert("La quantité doit etre comprise entre 1 et 100");
//         return;
//       }
//       let itemsStr = JSON.stringify(items);
//       localStorage.setItem("cart", itemsStr);
//     });
//   });
// }

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
  // j'appel l'ID qui contien le bouton deleteItem qui permet de supprimer les articles du panier en le transformant en tableau ce qui permet d'ajouter les articles à supprimer dans ce tableau.

  let deleteButtons = Array.from(document.querySelectorAll(".deleteItem"));
  let articleSuppr = [];
  // boucle for pour chaque article du tableau deleteButton 
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {

      // j'ajoute une demande de confirmation de suppression d'article au cas ou le client est fait une mauvaise manip

      deleteComfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteComfirm == true) {
        totalArticlesPrice -= productPrices[cart[i]._id] * cart[i].qte;
        totalArticlesQuantity -= cart[i].qte;
        totalQuantity.innerText = totalArticlesQuantity;
        totalPrice.innerText = totalArticlesPrice;

        // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
        cart.splice(i, 1)
        //  je récupere l'article qui est stoker dans le local storage pour le transformer en chaine de caractere grace a stringify.
        localStorage.setItem("cart", JSON.stringify(cart))
        alert("article supprimé avec succès")
        deleteButtons[i].closest(".cart__item").remove();


      }

    })
  }
}

// Sacré formulaire

const btnCommander = document.getElementById("order")

// validation du formulaire avec les regex puis requette serveru pour la validation
// les regex afficher permette d'etre utiliser dans le formulaire
// j'appel les id qui gere les erreurs du formulaire 

const validationForm = {
  firstName: {
    Element: document.getElementById("firstName"),
    regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
    errorMsg: "Prénom invalide",
  },
  lastName: {
    Element: document.getElementById("lastName"),
    regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
    errorMsg: "nom invalide",
  },
  address: {
    Element: document.getElementById("address"),
    regex: /^\d{1,5} [A-Za-z0-9\s,'-]{1,30}(?: [A-Za-z\s,'-]+){0,3}$/,
    errorMsg: "adresse invalide",
  },
  city: {
    Element: document.getElementById("city"),
    regex: /^[A-Z][a-z]+([\s-][A-Z][a-z]+)*$/,
    errorMsg: "ville invalide",
  },
  email: {
    Element: document.getElementById("email"),
    regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    errorMsg: "email invalide",
  },
};
let inputFirstName = document.getElementById('firstName');
inputFirstName.addEventListener("change", () => checkValidInput(validationForm.firstName));

let inputLastName = document.getElementById('lastName');
inputLastName.addEventListener("change", () => checkValidInput(validationForm.lastName));

let inputAddress = document.getElementById('address');
address.addEventListener("change", () => checkValidInput(validationForm.address));

let inputCity = document.getElementById('city');
inputCity.addEventListener("change", () => checkValidInput(validationForm.city));

let inputEmail = document.getElementById('email');
inputEmail.addEventListener("change", () => checkValidInput(validationForm.email));

// // je verifie avec cette fonction si les valeur de l'input son autoriser
// puis je regroupe tous ce qui a été déclarer .
// puis ifRegexValid sert a regrouper toute les const qui vont etre vérifier en une fois
async function checkValidInput(input) {
  const element = input.Element;
  const regex = input.regex;
  const errorMsg = input.errorMsg;
  const errorTxt = element.nextElementSibling;
  const isValid = regex.test(element.value);
  if (!isValid) {
    errorTxt.innerText = errorMsg;
    console.log(errorMsg)
  } else {
    errorTxt.innerText = "";
  }
  return isValid;
}

// appel au fetch pour retourner le formulaire sur confirmation:
// je créer la fonction qui enverra les données au serveur avec fetch methode post pour rejoindre la page order donc confirmation .html
const sendForm = async (contact, products) => {
  const response = await fetch(" http://localhost:3000/api/products/order ", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact, products),
  })
  // console.log(contact, products)
  const dataRes = await response.json();
  console.log(dataRes)
  return dataRes;
}

document.querySelector(".cart__order__form").addEventListener("submit", (event) => {
  event.preventDefault();
  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value
  }
  if (cart == null ||cart.length == "" || cart.length === 0 ||articles.length === 0) {

    alert("Your cart is empty, please add at least one item.");
    // si le panier es vide alors une alert previen qu'il faut ajouté un article
   
    window.location.href = 'index.html'
    
  } else if (
    checkValidInput(validationForm.firstName) == false ||
    checkValidInput(validationForm.lastName) == false ||
    checkValidInput(validationForm.address) == false ||
    checkValidInput(validationForm.city) == false ||
    checkValidInput(validationForm.email) == false
    
  ) {
    alert("Votre panier est vide, veuillez ajouter au moins un article.");
  }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(inputEmail.value)) {
      alert("l'adresse email n'est pas valide.");
      return;
    }
    localStorage.setItem("contact", JSON.stringify(contact));
    sendForm({ contact, products: cart.map((product) => product._id) })
      .then((data) => {
        localStorage.removeItem('cart');
        window.location.href = 'confirmation.html?id=' + data.orderId;
      });
  

})





