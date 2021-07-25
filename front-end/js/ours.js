/*---------------- Appel de la page produits------------*/

/*récupération de l'id des produits*/
let carte_ours = "";
const urlParametre = new URLSearchParams(document.location.search.substring(0));

let newId = urlParametre.get("_id");

/*Recherche de l'adresse de l'id*/

let newURL = "http://localhost:3000/api/teddies/" + newId;

/*switch option*/

fetch(newURL).then((response) =>
  response.json().then((data) => {
    let listcolor = "";
    for (let color of data.colors) {
      listcolor += `<option value="Sélectionner" class="Selectionner" style="color:${color}">${color}</option>`;
    }
    carte_ours = `
    <img src=${data.imageUrl} class="ourson" alt="${data.name}">
    <div class="description_ours">
    <h2>${data.name}</h2>
    <p id="prix_ours">${data.price / 100}€</p>
    <div class="colors">
    <form method="post">
    <p>
    <label for="couleur">Choisissez la Couleur</label><br/>
    <select name="couleur" id="couleur">
    ${listcolor}
    </select>
    </form>
    <div class="button_ours">
    <input class="button_ajout" type="button" value="Ajouter">
    </div>
    </div>`;

    document.querySelector("#carte_ours").innerHTML = carte_ours;
  })
);
/*----------------------ajout ours au local storage-------------*/
