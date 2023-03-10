// la function getcanape permet de return grace a fetch
// .then function permet de return la function pour que le fichier url en json pour qu'il soit lisible par json.

const section = document.getElementById('items')
// memo = fetch veux dire aller chercher
async function getCanapes() {
    return await fetch("http://localhost:3000/api/products")
        .then((contenuArticleResponse) => {
            // quand nous faison un return dans un then dans ce cas on peux l'appeler dans le prochain then
            return contenuArticleResponse.json()
        })
        // creer un catch qui return un message d'alert si l'api ne fonctionne pas 
        .catch((error) => {
            alert(error, "l'API est hors-ligne")
        })
}
// displayCanapes permet de cloner les articles au niveau du html tout en appelant les id canapes du debut
async function displayCanapes() {
    const canapes = await getCanapes()
    for(let canape of canapes){
        const canapeLink = document.createElement("a")
        canapeLink.setAttribute("href", `./product.html?id=${canape._id}`)
        section.appendChild(canapeLink)
        
        const canapeClone = 
        `<article>
            <img src= ${canape.imageUrl} alt= ${canape.altTxt}>
            <h3 class="productName">${canape.name} </h3>
            <p class="productDescription"> ${canape.description} </p>
        </article> `
        canapeLink.innerHTML = canapeClone
        console.log(canapeClone)
    }
}
displayCanapes()