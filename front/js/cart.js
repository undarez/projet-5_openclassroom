

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
  // console.log(quantityInputs)
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
  firstName: {
    Element: document.getElementById("firstName"),
    regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
    errorMSg: "Prénom invalide",
  },
  lastName: {
    Element: document.getElementById("lastName"),
    regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
    errorMSg: "nom invalide",
  },
  address: {
    Element: document.getElementById("address"),
    regex: /^\d{1,5} [A-Za-z0-9\s,'-]{1,30}(?: [A-Za-z\s,'-]+){0,3}$/,
    errorMSg: "adresse invalide",
  },
  city: {
    Element: document.getElementById("city"),
    regex: /^[A-Z][a-z]+([\s-][A-Z][a-z]+)*$/,
    errorMSg: "ville invalide",
  },
  email: {
    Element: document.getElementById("email"),
    regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    errorMSg: "email invalide",
  },
};

async function validateForm() {
  for (const field in validationForm) {
    const { Element, regex, errorMSg } = validationForm[field];
    const response = await fetch("/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [field]: Element.value,
        regex,
      }),
    });
    const result = await response.json();
    if (!result.valid) {
      console.error(errorMSg);
    }
  }
}


  async function checkValidInput(input) {
  const element = input.Element;
  const regex = input.regex;
  const errorMsg = input.errorMsg;
  const errorTxt = element.nextElementSibling;
  const isValid = regex.test(element.value);
  if (!isValid) {
  errorTxt.innerText = errorMsg;
  } else {
  errorTxt.innerText = "";
  }
  return isValid;
  }
  
  btnCommander.addEventListener("click", async (event) => {
  event.preventDefault();
  const contact = {
  firstName: validationForm.firstName.Element.value,
  lastName: validationForm.lastName.Element.value,
  address: validationForm.address.Element.value,
  city: validationForm.city.Element.value,
  email: validationForm.email.Element.value,
  };
  
  if (!cart || cart.length === 0) {
  alert("Your cart is empty, please add at least one item.");
  } else if (
  !(await checkValidInput(validationForm.firstName)) ||
  !(await checkValidInput(validationForm.lastName)) ||
  !(await checkValidInput(validationForm.address)) ||
  !(await checkValidInput(validationForm.city)) ||
  !(await checkValidInput(validationForm.email))
  ) {
  alert("The form is incorrect or incomplete, please check it!");
  } else {
  alert("Form is saved in local storage");
  localStorage.setItem("contact", JSON.stringify(contact))

    window.location.href = `http://127.0.0.1:5501/front/html/index.html`
  }
})


// récupérer les elements pour formulaire

// ajout d'un event change qui indique quand l'utilisateur change des donner et vérifie si un caractèere qui n'est pas autoriser est utiliser ou pas.
// je créé un tableau pour avec leur ID correspondant suivit de leur object 
// suivit d'une boucle forEACH qui est utiliser sur chaque élement de la liste 
// et enfin un event est lancer pour déclacher la function checkValidInput sur chaque élement associer

const inputElements = [
  {id: "firstName", validationForm: validationForm.firstName},
  {id: "lastName", validationForm: validationForm.lastName},
  {id: "address", validationForm: validationForm.address},
  {id: "city", validationForm: validationForm.city},
  {id: "email", validationForm: validationForm.email}
  ];
  
  inputElements.forEach(inputElement => {
  let input = document.getElementById(inputElement.id);
  input.addEventListener("change", () => checkValidInput(inputElement.validationForm));
  });

// appel au fetch pour retourner le formulaire sur confirmation:
// je créer la fonction qui enverra les données au serveur avec fetch methode post pour rejoindre la page order donc confirmation .html


async function sendForm(){

  const response = await fetch(`http://localhost:3000/api/products/order`,{
    method:"POST",
    //  dans le header j'indique quelle application autoriser dans le fetch
    headers: {"content-type": "application/json"},

    // j'appel l'objet contact qui me sert pour ajouter son contenue (Prenom, nom, adresse, ville,  )
  })
};


// function sendForm(){
//   fetch("http://localhost:3000/api/products/order",{
//     method: "POST",
//     // j'indique quelle application es autoriser dans le fetch
//     headers: { "content-type": "application/Json" },

//     //appel de stringify car la clef contact est un tableau donc a convertir en chaine de caractere
//     // idem pour cart qui le tableau de base que l'on creer au debut dans la function show cart
//     // exemple cart[i] 
//     body: JSON.stringify({contact, cart}),
//   })
//   // je demande une response en json pour récupérer orderid je veux dire L API
//   .then((response)=>{
//     return response.json()
//   })
//   .then((server) => {
//     const orderUser = server.orderUser
//     // je rajoute une condition si orderUser est true tu me return undefined 
//     if(orderUser == undefined){
//       return true
//       location.href

//     }

//   })
// };



