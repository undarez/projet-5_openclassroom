// creer une function anonyme qui séxécute seul
// creer une function qui return fetch avec le lien url du catalogue canapés Catalogue de canapés : http://localhost:3000/api/products.
// creer une function qui permet d'afficher les elements de chaque articles


// creer une function qui récupere les articles getCanapes
(async function() {
    const canapes = await getCanapes()

    // creer une boucle for

    for ( let canape of canapes) {
        displayCanapes(canape)
    }
})()

// la function getcanape permet de return grace a fetch
// .then function permet de return la function pour que le fichier url en json pour qu'il soit lisible par json.

// memo = fetch veux dire aller chercher
function getCanapes() {
    return fetch("http://localhost:3000/api/products")
    .then(function(contenuArticleResponse) {
        // quand nous faison un return dans un then dans ce cas on peux l'appeler dans le prochain then
        return contenuArticleResponse.json()
    })
    .then(function(canapes) {
        // le console.log canapes permet de visualiser dans le terminal si la function return bien la liste des canapes
        // console.log(canapes)
        return canapes
    })

    // creer un catch qui return un message d'alert si l'api ne fonctionne pas 
    
    .catch(function(error) {
        alert(error , "l'API est hors-ligne")
    })

}

const span = document.getElementById ('orderId')


