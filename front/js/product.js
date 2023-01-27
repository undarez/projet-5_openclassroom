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
  if (containercolor.value === "" || containercolor.value === null) {
    alert("veuillez choisir une couleur");
    return
  }

}

// choix qte = fonction qui renseigne dans le panier la quantité choisi par l'utilisateur.
let qte = document.getElementById("quantity");
function choixQte() {
  // création d'une variable qui indique la class qui remonte la quantité , qte.value cible la valeur inferireur a 1 ou null dans ce cas une alerte ce déclanche.
  if (qte.value < 1 || qte.value === null) {
    alert("veuillez choisir une quantité");
    return;
  }

}

// Rendu du produit sur la page produit
const renderProduct = async () => {
  await getCanapeId();
  containerh1.innerText = article.name;
  containerprice.innerText = article.price.toString();
  containerdesc.innerText = article.description;
  containerImg.innerHTML = `<img src="${article.imageUrl}" alt="${article.name}">`;
  article?.colors?.map((color) => {
    containercolor.innerHTML += `<option value="${color}">${color}</option>`;
  });
};
renderProduct();


// articleTab est un tableau qui contien les articles du panier
  
  // articleTab est un tableau qui contien les articles du panier
  const articleTab = []
  const inlocalStorage = JSON.parse(localStorage.getItem("cart"))
 
  
addToCart.addEventListener('click', () => {
            choixColors();
            choixQte();
            let articlePanier = {
              _id: article._id,
              description: article.description,
              name: article.name,
              // ici ont supprimme le article.price pour pas que l'utilisateur mal aviser modifie le prix
              // price : article.price,
              imageUrl: article.imageUrl,
              altTxt: article.altTxt,
              color: containercolor.value,
              qte: Number(qte.value)
            };
            if(inlocalStorage) {
              const productInCart = inlocalStorage.find((product) => product._id === articlePanier._id && product.color === articlePanier.color);
              if(productInCart) {
                productInCart.color = containercolor.value
                  productInCart.qte += articlePanier.qte;
                  articleTab.push(productInCart, ...inlocalStorage.filter((product) => product._id !== articlePanier._id));
              } else {
                  articleTab.push(...inlocalStorage, articlePanier);
              }
            } else {
              articleTab.push(articlePanier);
          }  

    window.localStorage.setItem('cart', JSON.stringify(articleTab));
    window.location.href = 'cart.html';
  }
  )
  
  
  

