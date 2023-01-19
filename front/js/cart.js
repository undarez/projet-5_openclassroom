

let cart = JSON.parse(localStorage.getItem("object"));

let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

async function showCart()
{

  for (let i=0; i<cart.length; i++)
  {
      let price = await getProductPriceById(cart[i]._id);

      totalArticlesQuantity += parseInt(cart[i].qte);
      totalArticlesPrice += parseInt(cart[i].qte * price);      

      let article = `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                    <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${cart[i].name}</h2>
                      <p>Vert</p>
                      <p>${price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input  data-id="${cart[i].id}" data-color="${cart[i].color}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].qte}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p  data-id="${cart[i].id}" data-color="${cart[i].color}" class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;

    articles.innerHTML += article;

    totalPrice.innerHTML = totalArticlesPrice;
    totalQuantity.innerHTML = totalArticlesQuantity;

    updateQuantity();
    deleteItemCard();

  }
}
// on appelle la fonction qui rempli la page
showCart();



// Mise à jour de la quantité de l'article
function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
      quantityInput.addEventListener("change", (event) => {   
          event.preventDefault();          
          const inputValue = event.target.value;
          const dataId = event.target.getAttribute("data-id");
          const dataColor = event.target.getAttribute("data-color");
          let cartItems = localStorage.getItem("object");
          let items = JSON.parse(cartItems);

          items = items.map((item, index) => {              
              if (item.id === dataId && item.color === dataColor) {
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
          updateCart();          
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
          for (let i=0; i<response.length; i++)
          {                         
              if (response[i]._id == artId)
              {                
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
          updateCart();

          const deleteKanap = JSON.parse(localStorage.getItem("object"));
          if (deleteKanap.length === 0) {
              localStorage.removeItem("object");
              alert('Panier vide, retour à l\'accueil.');
              window.location.href = "index.html";
          }
      });

  });
}

// Mise à jour du panier dynamique
async function updateCart() {
  let cartItem = JSON.parse(localStorage.getItem("object"));
  let totalQuantity = 0;
  let totalPrice = 0;
  
  for (i = 0; i < cartItem.length; i++) 
  {      
      let price = await getProductPriceById(cartItem[i]._id);
      totalQuantity += parseInt(cartItem[i].qte);
      totalPrice += parseInt(price * cartItem[i].qte);                  
  }
  
  console.log(totalPrice);

  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
}
