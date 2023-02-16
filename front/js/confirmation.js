let id = new URL(window.location.href).searchParams.get("id")

orderId.innerText = id

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

if (!id){
  orderId.removeChild(btnRetour)
}else{orderId.appendChild(btnRetour)}

// Ajoutez un événement click au bouton
btnRetour.addEventListener("click", function() {
  localStorage.clear();
  window.location.href ="index.html"
});