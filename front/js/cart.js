

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
// on appelle la fonction qui rempli la page showCart

showCart();


// Mise à jour de la quantité de l'article
function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  console.log(quantityInputs)
  quantityInputs.forEach(async (quantityInput) => {
    let currentProductPrice = await getProductPriceById(quantityInput.getAttribute("data-id")).then(
      data => data
    )
    // ajout de l'event change pour permettre à l'utilisateur de changer la quantité au cas ou il est oublier un article.
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
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
// j'appel l'ID qui contien le bouton deleteItem qui permet de supprimer les articles du panier en le transformant en tableau ce qui permet d'ajouter les articles à supprimer dans ce tableau.

  let deleteButtons = Array.from(document.querySelectorAll(".deleteItem"));
  let articleSuppr = [];
  // boucle for pour chaque article du tableau deleteButton 
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      // parentElement.style.display permet de rendre invisible l'element selectionner avec le bouuton delete
      deleteButtons[i].parentElement.style.display = "none"

      // Copie du tableau cart dans le tableau articleSuppr
      articleSuppr = cart

      // j'ajoute une demande de confirmation de suppression d'article au cas ou le client est fait une mauvaise manip

      deleteComfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteComfirm == true){
        // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
        articleSuppr.splice([i], 1)
  //  je récupere l'article qui est stoker dans le local storage pour le transformer en chaine de caractere grace a stringify.
        cart = localStorage.setItem("cart", JSON.stringify(articleSuppr))
        alert("article supprimé avec succès")

      }

      // j'actualise la page apres la suppression de l'article du panier 
      window.location.href = `http://127.0.0.1:5501/front/html/cart.html`
    })
  }
}



// Sacré formulaire

const  btnCommander = document.getElementById("order")

// validation du formulaire avec les regex puis requette serveru pour la validation
// les regex afficher permette d'etre utiliser dans le formulaire
// j'appel les id qui gere les erreurs du formulaire 

const validationForm = {
  firstName : {
    Element: document.getElementById("firstName"),
    regex: /^[^\d]*$/, 
    errorMSg: "Prénom invalide"
  },
  lastName : {
    Element: document.getElementById("lastName"),
    regex: /^.*(\s(\B#([a-z]{2,})(?!|[?.,]*\w)\s)+).*$/, 
    errorMSg: "nom invalide"
  },
  address : {
    Element: document.getElementById("address"),
    regex: /^([A-Za-z0-9]+[\s]?)+$/, 
    errorMSg: "adresse invalide"
  },
  city : {
    Element: document.getElementById("city"),
    regex: /^.*(\s(\B#([a-z]{2,})(?!=*\w)\s)+).*$/,
    errorMSg: "ville invalide"
  },
  email : {
    Element: document.getElementById("email"),
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    errorMSg: "email invalide"
  },
  
}


// // je verifie avec cette fonction si les valeur de l'input son autoriser
// puis je regroupe tous ce qui a été déclarer .
// puis ifRegexValid sert a regrouper toute les const qui vont etre vérifier en une fois
function checkvalidinput (input){
  const element = input.Element
  const regex = input.regex
  const errorMsg = input.errorMsg
  const errorTxt = input.Element.nextElementSibling
  const ifRegexValid = regex.test(element.value)
  if (ifRegexValid){
    errorTxt.innerText = errorMsg
  }else{
    errorTxt.innerText = ''
  }
  return ifRegexValid
}


// ajout d'un event pour récupérer la valeur des information de l'utilisateur sur l'objet contact qui est lui meme appeler 
btnCommander.addEventListener("click",(e)=>{
  e.preventDefault();
  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    adress:  inputAddress.value,
    city:  inputCity.value,
    email:  inputEmail.value
  }
  // on vérifie si le panier n'est pas vide 
  // si il ya pas de qte ou que la qte est egal à zéro alors une alert previens que le panier est vide
  if (cart == null || cart.length == 0){
    alert("votre panier est vide veuillez au minimun ajouté une quantité de 1")
  }
  else if(
    checkvalidinput(validationForm.firstName) == false &&
    checkvalidinput(validationForm.lastName) == false &&
    checkvalidinput(validationForm.address) == false &&
    checkvalidinput(validationForm.city) == false &&
    checkvalidinput(validationForm.email) == false 
  ){
    alert("le formulaire n'est pas correct ou imcomplet veuillez verifier SVP!")
  }else{
    // j'enregistre le formulaire dans le localstorage
    // contact correspond a l'objet qui contient les valeur de nom, prenom, city, adress, email
    localStorage.setItem("contact", JSON.stringify(contact))
  }
})

// récupérer les elements pour formulaire

// ajout d'un event change qui indique quand l'utilisateur change des donner et vérifie si un caractèere qui n'est pas autoriser est utiliser ou pas.
let inputFirstName = document.getElementById('firstName');
inputFirstName.addEventListener("change",()=>checkvalidinput(validationForm.firstName))//.Element,
  //validationForm.firstName.regex));
let inputLastName = document.getElementById('lastName');
inputLastName.addEventListener("change",()=>checkvalidinput(validationForm.lastName));
let inputAddress = document.getElementById('address');
address.addEventListener("change",()=>checkvalidinput(validationForm.address));
let inputCity = document.getElementById('city');
inputCity.addEventListener("change",()=>checkvalidinput(validationForm.city));
let inputEmail = document.getElementById('email');
inputEmail.addEventListener("change",()=>checkvalidinput(validationForm.email));
//Déclaration des variables pour vérifier la bonne valeur des champs du formulaire

// function SearchInput (inpValue, regex ){
//   if(inpValue !== regex ){
//     return(true)
//   }else{
//     alert("veuillez utiliser les caractères disponible dans la case du formulaire")
//   }
// }

// // adresser une class a l'objet

// // Récupération des données du user dans le local storage
// const userInstorage = JSON.parse(localStorage.getItem('user'));

// appel au fetch pour retourner le formulaire sur confirmation:

function sendForm() {
  const containedForm = document.querySelector(".cart__order__form");
  
  containedForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // appel a l'objet valueForm pour tous les element de l'utilisateur sur le form
    const valueForm = {
      firstName: (e.target.querySelector("[name=firstname]").value),
      lastName: (e.target.querySelector("[name=lastName]").value),
      address: (e.target.querySelector("[name=address]").value),
      city: (e.target.querySelector("[name=city]").value),
      email: (e.target.querySelector("[name=email]").value),
    }
    console.log(e)
    //  creation de la charge utile en JSON
    const ChargeForm = JSON.stringify(valueForm);
    // appel de fetch
    fetch("http://localhost:3000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        // création d'un tableau d'article
        let productTabs = []
        //transformer le tableau
        let transformTab = JSON.stringify({ productTabs, valueForm })
        // ajout de l'objet valueForm et des identifiants des produits au tableau
        for (let productTab of productTabs) {
          productTab = push(productTabs._id)
        }
        console.log(transformTab)
        console.log(productTabs)

        async function send(order) {
          // appel de l'API
          let reponse = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "content-type": "application/Json" },
            body: transformTab, ChargeForm
          });
          if (reponse.ok) {
            // reponse du serveur
            const result = await reponse.json(order)
            localStorage.removeItem(sendForm)
            window.location.href = `http://127.0.0.1:5501/front/html/confirmation.html?orderID=${result.orderId}`
          } else {
            alert("cela ne fonctionne pas")
          }
        } console.log(send)


        sendForm()
        send()
      })



  })
  sendForm()
}



