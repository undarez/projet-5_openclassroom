// // function newUser(data) {
  //   // appel de fetch
  //   fetch( apiURL + "/order",{ //order est demander comme parametre dans l'énnoncé
  //     method: "POST",
  //     headers: {"Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(sendData)//appel des des info de L'API en JSON
  //   }).then ((response)=>{
    //     return response.json()
    //   })
    //   .then((data)=>{
      //     const {orderId} = data
      //     return {contact, products, orderId}
      //   })
      //   .catch((error)=>{
        //     alert("les données ne sont pas transmise au server", error)
        //   })
//   // window.location.href = "confirmation.html"
//   // }





// async function newUser( data = {}) {
  //   const response = await fetch("http://localhost:3000/api/products/order", {
    //     method: 'POST',
    //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(data)
      //   });
      //   return response.json();
// }

// appel de l'objet contact avec newUser (les articles commandées et les infos du formulaire)
// newUser({products, contact})

// let productsOrderId = []
// //  je copie le tableau cart qui contien les info des produits
// productsOrderId = cart
// apiURL + "/order"
// "http://localhost:3000/api/products/order"
//  


// function newUser(data) {
//   // appel de fetch
//   fetch( apiURL + "/order",{ //order est demander comme parametre dans l'énnoncé
//     method: "POST",
//     headers: {"Content-Type": "application/json",
//   },
//   body: JSON.stringify(data)//appel des des info de L'API en JSON
//   // }).then ((response)=>{
    
//   // })
//   // .catch((error)=>{
//   //   alert("les données ne sont pas transmise au serveru", error)
//   // })
// })
//   // return response.json()
//   // window.location.href = "confirmation.html"
  

// }

// const newUser = 
//   fetch("http://localhost:3000/api/products/order", {
//     method: "POST",
//     //  dans le header j'indique quelle application autoriser dans le fetch
//     headers: { "Content-Type": "application/json" },
//     // on copie de nouveau le tableau cart dans le tableau sendProductConfirm
//     // sendProductConfirm = cart
//     body: JSON.stringify(contact, cart),
//     // j'appel l'objet contact qui me sert pour ajouter son contenue (Prenom, nom, adresse, ville,  )
//   });
//   // appel du then avec response


// newUser.then(async (response) => {
//   try {
//     const contenu = await response.json();
//     console.log(contenu)
//   } catch (error) {

//     console.log(error)
//   }


// })


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


// ===================================================================================

//                          version du 05/02/2023

// ===================================================================================
// async function validateForm() {
//   for (const field in validationForm) {
//     const { Element, regex, errorMSg } = validationForm[field];
//     const response = await fetch("/validate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         [field]: Element.value,
//         regex,
//       }),
//     });
//     const result = await response.json();
//     if (!result.valid) {
//       console.error(errorMSg);
//     }
//   }
// }


// async function checkValidInput(input) {
//   const element = input.Element;
//   const regex = input.regex;
//   const errorMsg = input.errorMsg;
//   const errorTxt = element.nextElementSibling;
//   const isValid = regex.test(element.value);
//   if (!isValid) {
//     errorTxt.innerText = errorMsg;
//   } else {
//     errorTxt.innerText = "";
//   }
//   return isValid;
// }

// btnCommander.addEventListener("click", async (event) => {
//   event.preventDefault();
//   let contact = {
//     firstName: validationForm.firstName.Element.value,
//     lastName: validationForm.lastName.Element.value,
//     address: validationForm.address.Element.value,
//     city: validationForm.city.Element.value,
//     email: validationForm.email.Element.value,
//   };

//   if (!cart || cart.length === 0) {
//     alert("Your cart is empty, please add at least one item.");
//   } else if (
//     !(await checkValidInput(validationForm.firstName)) ||
//     !(await checkValidInput(validationForm.lastName)) ||
//     !(await checkValidInput(validationForm.address)) ||
//     !(await checkValidInput(validationForm.city)) ||
//     !(await checkValidInput(validationForm.email))
//   ) {
//     alert("The form is incorrect or incomplete, please check it!");
//   } else {
//     alert("Form is saved in local storage");
//     localStorage.setItem("contact", JSON.stringify(contact))
//     newUser(cart)

//     // window.location.href = `http://127.0.0.1:5501/front/html/confirmation.html`
//   }
// })
  

// // récupérer les elements pour formulaire

// // ajout d'un event change qui indique quand l'utilisateur change des donner et vérifie si un caractèere qui n'est pas autoriser est utiliser ou pas.
// // je créé un tableau pour avec leur ID correspondant suivit de leur object 
// // suivit d'une boucle forEACH qui est utiliser sur chaque élement de la liste 
// // et enfin un event est lancer pour déclacher la function checkValidInput sur chaque élement associer

// const inputElements = [
//   { id: "firstName", validationForm: validationForm.firstName },
//   { id: "lastName", validationForm: validationForm.lastName },
//   { id: "address", validationForm: validationForm.address },
//   { id: "city", validationForm: validationForm.city },
//   { id: "email", validationForm: validationForm.email }
// ];

// inputElements.forEach(inputElement => {
//   let input = document.getElementById(inputElement.id);
//   input.addEventListener("change", () => checkValidInput(inputElement.validationForm));
// });

// // appel au fetch pour retourner le formulaire sur confirmation:
// // je créer la fonction qui enverra les données au serveur avec fetch methode post pour rejoindre la page order donc confirmation .html

 
// // creation de l'objet contact

// let contact = {
//   firstName: firstName.value,
//   lastName: lastName.value,
//   address: address.value,
//   city: city.value,
//   email: email.value
// };

// const apiURL = "http://localhost:3000/api/products"

// // products = tableau vide
// products = []
// // copie du tableau cart
// products = cart 

// for( let j = 0; j < products.length; j++){



//   // console.log(products[j])
// }

//  function newUser(data) {
//   // appel de fetch
//   fetch( apiURL + "/order",{ //order est demander comme parametre dans l'énnoncé
//     method: "POST",
//     headers: {"Content-Type": "application/json",
//   },
//   body: JSON.stringify(data)//appel des des info de L'API en JSON
//   }).then ((response)=>{
    
//   })
//   .catch((error)=>{
//     alert("les données ne sont pas transmise au serveru", error)
//   })
//   // window.location.href = "confirmation.html"
//   return response.json()
// }