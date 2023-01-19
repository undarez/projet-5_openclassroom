// creer une function qui permet de prendre l'id de chaque article quand on click sur un article pour connaitre sa description complete

// appeler chaque elt du fichier html pour pouvoir les appeler avec js
const containerImg = document.querySelector(".item__img")
const containerh1 = document.querySelector("title")
const containerdesc = document.getElementById("description")
const containercolor = document.getElementById("colors")
const containerprice = document.getElementById("price")
const containerAddToCart = document.getElementById("addToCart")


// creer une variable qui contient le code html du panier qui débute a la ligne 80
let productPanier = document.querySelector(".item");

let id = new URL(window.location.href).searchParams.get("id")
const url = `http://localhost:3000/api/products/${id}`;
// objetcTemp = objet temporaire
const article = {}


// la function getCanapeId est une fonction temporaire qui indique l'appel des éléments obligatoire de l'article exemple : article.name = data.name le data.name nous indique le nom de l'article renseigner sur la page Product.js qui a tous les renseignements de chaque article.
async function getCanapeId() {
  await fetch(url)
    .then(res => res.json())
    .then(data => {
      article.name = data.name
      article.description = data.description
      article.price = data.price
      article.colors = data.colors
      article.imageUrl = data.imageUrl
      article._id = data._id
      article.altTxt = data.altTxt
    })
}
// getCanapeId()


// Le choix de la couleur fonction qui renseigne dans le panier la couleur choisi par l'utilisateur.
let color = document.getElementById("colors");
function choixColors() {
  // || = ou logique pipe
  // if = color === veux dire est égale la couleur choisis , puis le === null est égal à vide donc une alert en envoyer pour indiquer qu'il faut choisir une couleur obligatoire pour valider le panier.
  if (color.value === "" || color.value === null) {
    alert("veuillez choisir une couleur");
    return
  }
  
}

// choix qte = fonction qui renseigne dans le panier la quantité choisi par l'utilisateur.
let qte = document.getElementById("quantity");
function choixQte() {
  // création d'une variable qui indique la class qui remonte la quantité , qte.value cible la valeur inferireur a 1 ou null dans ce cas une alerte ce déclanche.
  if (qte.value <1 || qte.value === null ) {
    alert("veuillez choisir une quantité");
    return;
  }
  
}

// Rendu du produit sur la page produit
const renderProduct = async (currentProduct) => {
  await getCanapeId();
  containerh1.innerHTML = currentProduct.name;
  containerprice.innerHTML = currentProduct.price.toString();
  containerdesc.innerHTML = currentProduct.description;
  containerImg.innerHTML = `<img src="${currentProduct.imageUrl}" alt="${currentProduct.name}">`;
  currentProduct?.colors?.map((color) => {
    containercolor.innerHTML += `<option value="${color}">${color}</option>`;
  });
};
renderProduct(article);


// articleTab est un tableau qui contien les articles du panier
const articleTab = []
const inlocalStorage = JSON.parse (localStorage.getItem("object"))
// const inlocalStorage = JSON.parse(localStorage.getItem("object"))

// creer une function addToCart qui ajout le produit au panier
// creer une function click qui au clique sur le bouton ajout le produit
// rectification lier le click au Addtocart
containerAddToCart.addEventListener('click', function () {
  // choixColors();choixQte(); appel des fonction pour quelle soit dans le addtoCart donc le panier apres validation du bouton .
  choixColors();
  choixQte();
  
  let articlePanier = {
    _id : article._id,
    description : article.description,
    name : article.name,
    price : article.price,
    imageUrl : article.imageUrl,
    altTxt : article.altTxt,
    color : color.value,
    qte : Number(qte.value)  
  }


  // ici la condition articleTab.length indique que si le panier est égal a 0 dans ce cas on push le nouvel article dans le panier qui est copier
  if(inlocalStorage) {
    articleTab.push (...inlocalStorage, articlePanier)
  
  }else{
    articleTab.push(articlePanier)
  }




    // ici ont demande a articleTab de pousser le tableau qui contien les donner
    
    console.log(articlePanier)
    window.localStorage.setItem("object", JSON.stringify(articleTab))
    
    // let inObject = window.localStorage.getItem('object');
    // return (inObject);
  window.location.href = "cart.html"
});

