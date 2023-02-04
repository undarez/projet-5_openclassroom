// Déclaration de variables qui doivent être dispoibles sur l'ensemble de la page --------------------------------------------
let cartTable = document.querySelector(".cartTable");
let cartForm = document.querySelector(".formContainer");
let footerCheckoutBtn = document.createElement("button");

cartForm.style.display = "none"; // Le formulaire ne doit pas être affiché tout de suite, uniquement après validation du panier

createCartArray();

// Mise en place du panier sous forme d'un tableau -------------------------------------------------------------------------------
function createCartArray() {
  cartTable.innerHTML = ""; // Le tableau est vide tant que le panier l'est

  let cart = JSON.parse(localStorage.getItem("articleStored")) || []; // Récupération du localStorage
  
  if (cart.length > 0) {
    totalPrice = 0;

    let tableHead = document.createElement("thead");
    let headName = document.createElement("th");
    let headOption = document.createElement("th");
    let headQuantity = document.createElement("th");
    let headUniquePrice = document.createElement("th");
    let headTotalPrice = document.createElement("th");
    let deleteArticle = document.createElement("th");
    let tableFooter = document.createElement("tfoot");
    let tableFooterLine = document.createElement("td");
    let footerTotal = document.createElement("th");
    let footerCheckout = document.createElement("th");

    headName.classList.add("text-center");
    headOption.classList.add("text-center");
    headQuantity.classList.add("text-center");
    headUniquePrice.classList.add("text-center");
    headTotalPrice.classList.add("text-center");
    deleteArticle.classList.add("text-center");
    footerCheckoutBtn.classList.add("btn", "btn-success", "btn-small");

    tableFooterLine.setAttribute("align", "right"); // Ajustement pour la ligne "total"
    tableFooterLine.setAttribute("colspan", "6");

    headName.textContent = "Nom";
    headOption.textContent = "Objectif";
    headQuantity.textContent = "Quantité";
    headUniquePrice.textContent = "Prix unitaire";
    headTotalPrice.textContent = "Prix total";
    deleteArticle.textContent = "";
    footerCheckoutBtn.textContent = "Commander";

    cartTable.appendChild(tableHead);
    cartTable.appendChild(tableFooter);
    tableHead.appendChild(headName);
    tableHead.appendChild(headOption);
    tableHead.appendChild(headQuantity);
    tableHead.appendChild(headUniquePrice);
    tableHead.appendChild(headTotalPrice);
    tableHead.appendChild(deleteArticle);
    tableFooter.appendChild(tableFooterLine);
    tableFooterLine.appendChild(footerTotal);
    tableFooterLine.appendChild(footerCheckout);
    footerCheckout.appendChild(footerCheckoutBtn);

    let tableBody = document.createElement("tbody"); // On rajoute une ligne au tableau pour chaque article ajouté au panier, en prenant compte de la quantité
    for (let i = 0; i < cart.length; i++) {
      tableBody.appendChild(createArrayLine(cart[i], i));
      totalPrice += cart[i].price * cart[i].number;
    }

    footerTotal.textContent = "Total : " + totalPrice + " €";
    //console.log(totalPrice);

    cartTable.appendChild(tableBody); 

  // Remplissage du tableau  ---------------------------------------------------------------------------------------------------
    function createArrayLine(item, i) { // On rajoute les diverses informations en fonction des produits présents dans le panier
      let articleIndex = i;
      let articleLine = document.createElement("tr");

      let lineName = document.createElement("td");
      let lineOption = document.createElement("td");
      let lineQuantity = document.createElement("td");
      let quantityLess = document.createElement("button");
      let quantityNumber = document.createElement("p");
      let quantityMore = document.createElement("button");
      let lineUniquePrice = document.createElement("td");
      let lineTotalPrice = document.createElement("td");
      let lineDelete = document.createElement("td");

      lineName.classList.add("text-center");
      lineOption.classList.add("text-center");
      lineQuantity.classList.add(
        "align-middle",
        "d-flex",
        "justify-content-around",
        "align-items-center"
      );
      quantityLess.classList.add(
        "quantity-button",
        "btn",
        "btn-sm",
        "btn-outline-secondary"
      );
      quantityNumber.classList.add("text-center", "m-0");
      quantityMore.classList.add(
        "quantity-button",
        "btn",
        "btn-sm",
        "btn-outline-secondary"
      );
      lineUniquePrice.classList.add("text-center");
      lineTotalPrice.classList.add("text-center");
      lineDelete.classList.add("text-center");

      lineName.textContent = item.name;
      lineOption.textContent = item.lense;
      quantityNumber.textContent = item.number;
      quantityLess.textContent = "-";
      quantityMore.textContent = "+";
      lineUniquePrice.textContent = item.price + " €";
      lineTotalPrice.textContent = item.price * item.number + " €";
      lineDelete.innerHTML =
        "<button type='button' class='btn btn-danger btn-sm'><i class='fas fa-trash-alt'></i></button>";

      tableBody.appendChild(articleLine);
      articleLine.appendChild(lineName);
      articleLine.appendChild(lineOption);
      articleLine.appendChild(lineQuantity);
      lineQuantity.appendChild(quantityLess);
      lineQuantity.appendChild(quantityNumber);
      lineQuantity.appendChild(quantityMore);
      articleLine.appendChild(lineUniquePrice);
      articleLine.appendChild(lineTotalPrice);
      articleLine.appendChild(lineDelete);

      // Fonctions permettant de rajouter ou supprimer des éléments du panier ------------------------------------------

      quantityLess.addEventListener("click", () => { // Enlever l'exemplaire d'un article
        if (item.number > 1) {                       // Uniquement si il y a plus d'un article
          cart[i].number--;
          localStorage.setItem("articleStored", JSON.stringify(cart)); // Met à jour le localStorage
          createCartArray(); // Recharge le tableau avec les nouvelles valeurs
          cartAddWidget(); // idem pour le widget
        }
      });

      quantityMore.addEventListener("click", () => { // Rajouter l'exemplaire d'un article
        cart[i].number++;
        localStorage.setItem("articleStored", JSON.stringify(cart));
        createCartArray();
        cartAddWidget();
      });

      lineDelete.addEventListener("click", () => { // Suppression totale  d'un article
        cart.splice(articleIndex, 1); // Supprime un élement à partir de l'index
        localStorage.setItem("articleStored", JSON.stringify(cart));
        createCartArray();
        cartAddWidget();
      });


      return articleLine; // La fonction nous retourne une ligne dans le tableau via la variable déclarée au début
    }

  } else { // Sinon un message apparaît si le panier est vide
    cartTable.innerHTML =
      "<p class='text-center'>Oops ! Il semblerait que celui-ci soit vide.</p>";
    cartForm.innerHTML = ""; // Le formulaire n'apparaît pas non plus
  }
}

// Mise en place du formulaire pour finaliser la commande et l'envoyer au serveur  ----------------------------------------------------------------------------



  // On cible les données du formulaire 
  let firstName = document.getElementById("formFirstName").value; 
  let lastName = document.getElementById("formLastName").value;
  let address = document.getElementById("formAddress").value;
  let city = document.getElementById("formCity").value;
  let email = document.getElementById("formEmail").value;

  // Création d'un objet contact en prévision de son envoi au serveur
  let contact = { 
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  sendFormData({ products, contact }); // Appel de la formule ci-dessous en prenant comme arguments les articles commandées et les infos du formulaire
}

// Envoi de products et contact au serveur via la méthode POST ----------------------------------------------------------------
function sendFormData(data) {
  fetch(apiURL + "order", { // "order" est un paramètre demandé par l'API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // L'API necessite que les informations soient transmises en JSON
  })
    .then((response) => {
      //console.log(response); // 201 si OK
      return response.json();
    })
    .then((response) => {
      localStorage.setItem("articleStoredConfirm", JSON.stringify(response)); // Le retour de l'API est placé dans le LocalStorage
      localStorage.setItem("articleStored", JSON.stringify([])); // Ainsi que la liste des articles commandés
      localStorage.setItem("totalPrice", totalPrice); // On y rajoute le prix total pour l'utiliser sur la page de confirmation
      window.location.href = "confirmation.html"; // La page de confirmation est chargée
    })

    .catch((error) => {
      alert("Les informations ne sont pas en mesure d'être transmises à notre serveur", error);
    });

    //console.log(data)   
}

// Gestion des boutons "commander" et "finaliser" ---------------------------------------------------------------------------------------------------
footerCheckoutBtn.addEventListener("click", () => { // Le formulaire apparaît lorsqu'on clique sur le bouton "Commander"
  cartForm.style.display = "block";
});

cartForm.addEventListener("submit", (evnt) => { // Lorsqu'on clique sur le bouton du formulaire les données products & contact sont transmises au serveur
  evnt.preventDefault(); // Annuler l'action par défaut du bouton submit, nous voulons que la page de confirmation s'affiche
  getFormData();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Valider les champs requis
  if (!firstname.value || !lastname.value || !address.value || !city.value || !email.value) {
    alert("Veuillez remplir tous les champs requis");
    return;
  }

  // Valider le type de chaque champ
  if (typeof firstname.value !== "string" || typeof lastname.value !== "string" || typeof address.value !== "string" || typeof city.value !== "string" || typeof email.value !== "string") {
    alert("Tous les champs doivent être de type string");
    return;
  }

  // Récupérer les produits dans le panier
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productIds = cart.map(item => item._id);

  // Préparer les données à envoyer au serveur
  const contact = {
    firstname: firstname.value,
    lastname: lastname.value,
    address: address.value,
    city: city.value,
    email: email.value
  };
  const data = {
    contact,
    productIds
  };

  // Envoyer les données au serveur avec la méthode POST
  const response = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // Vérifier la réponse du serveur
  if (response.ok) {
    const result = await response.json();
    alert(result.message);
  } else {
    const error = await response.json();
    alert(error.message);
  }
});