const orderId =  document.getElementById("orderId")

const dataOrderId = JSON.parse(localStorage.getItem("orderId"));

orderId.innerText = dataOrderId


// ajout d'un boutton qui permet de revenir a l'acceuil
// le btn = retourAcceuil
// const R = le text (noeud textuel)
// btn.appenchild(r) ajout du text (retour à l'acceuil)


const btnRetour = document.createElement("button");
btnRetour.innerHTML = "Retour à l'acceuil";

const styleBtnRetour = `
font-size: 1rem;
color: white;
background-color : #2c3e50;
border-radius : 999px;
padding : 10px 20px;
display : block;
margin : 0 auto;
margin-top : 25px;
justify-content : center;
cursor : pointer;
`
btnRetour.style = styleBtnRetour

// une condition si pas de commande le boutton n'apparait pas si il y en a une dans ce cas il apparait

if (!dataOrderId){
  orderId.removeChild(btnRetour)
}else{orderId.appendChild(btnRetour)}

// Ajoutez un événement click au bouton
btnRetour.addEventListener("click", function() {
  localStorage.clear();
  window.location.href ="index.html"
});




// const btnRetour = document.createElement("button")
// const r = retourAcceuil = document.createTextNode("retour à l'acceuil")
// btnRetour.appendChild(r)
// document.body.appendChild(btnRetour)
// btnRetour.innerText = "retour à l'acceuil"
// btnRetour.addEventListener("click", ()=>{
//   alert("vous retournez a l'acceuil")
//   window.location.href = "article.js"
// })


// order.innerText = new Date().getTime()
// console.log(order);