/*---------------- ESSAI appel de la page produits------------*/

/*récupération de l'id des produits*/
let carte_ours = "";
const urlParametre = new URLSearchParams(document.location.search.substring(0));

let newId = urlParametre.get("_id");

/*Recherche de l'adresse de l'id*/

let newURL = "http://localhost:3000/api/teddies/" + newId;

fetch(newURL).then((response) =>
  response.json().then((data) => {
    carte_ours = `
    <img src=${data.imageUrl} class="ourson" alt="${data.name}">
    <div class="description_ours">
    <h2>${data.name}</h2>
    <p id="prix_ours">${data.price}</p>
    <div class="button_ours">
    <input class="button_ajout" type="button" value="Ajouter">
    </div>
    </div>`;

    document.querySelector("#carte_ours").innerHTML = carte_ours;
  })
);
