/*---------------- Appel de la page produits par le back end------------*/

/*récupération de l'id des produits*/
let carte_ours = "";
const urlParametre = new URLSearchParams(document.location.search.substring(0));

let newId = urlParametre.get("_id");

/*Recherche de l'adresse de l'id*/

let newURL = "http://localhost:3000/api/teddies/" + newId;

/*switch celon l'id*/

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
    <form>
    <p>
    <label for="couleur">Choisissez la Couleur</label><br/>
    <select name="couleur" id="couleur" aria-label="Couleurs">
    ${listcolor}
    </select><br/>
    <label for="quantite">Quantité d'ours:</label>
    <select name="quantite" id="quantite" aria-label="Quantité">
      </select>
    </form>
    <div class="button_ours">
    <input class="button_ajout" type="button" value="Ajouter" id="btn_envoie_panier">
    </div>
    </div>`;

    document.querySelector("#carte_ours").innerHTML = carte_ours;

    /* gestion des quantités d'Oursons*/
    const htmlQuantité = `
    <option value ="1">1</option>
    <option value ="2">2</option>
    <option value ="3">3</option>
    <option value ="4">4</option>
    <option value ="5">5</option>
    `;
    /*affiché le html dans la quantité d formulaire*/
    const affichageQuantité = document.querySelector("#quantite");
    affichageQuantité.innerHTML = htmlQuantité;
    /*sélction du bouton ajout panier*/
    const btnEnvoiePanier = document.querySelector("#btn_envoie_panier");
    /*le bouton envoie le panier*/
    btnEnvoiePanier.addEventListener("click", (e) => {
      e.preventDefault();
      const quantite = document.getElementById("quantite");
      /*quantité ours sélectionné*/
      const choixQuantiteOurs = affichageQuantité.value;
      console.log(choixQuantiteOurs);
      /*récupération des valeurs des Ours*/
      let ajoutOurs = {
        idOurs: data._id,
        nomOurs: data.name,
        quantiteOurs: choixQuantiteOurs,
        prixOurs: (data.price * choixQuantiteOurs) / 100 + "€",
      };
      /*----------------------ajout ours au local storage-------------*/
      /*récupération des Ours sélectionnées*/
      let oursDansLeLocalStorage = JSON.parse(localStorage.getItem("Ourson"));
      /*fenêtre popup*/
      const popupAjoutPanier = () => {
        if (
          window.confirm(
            `${data.name} a été ajouter à votre liste d'achat ! Cliquer sur OK si vous souhaitez aller au panier, sinon ANNULER`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "acceuil.html";
        }
      };
      /*Si produit déjà présent dans le local Storage*/
      if (oursDansLeLocalStorage) {
        oursDansLeLocalStorage.push(ajoutOurs);
        localStorage.setItem("Ourson", JSON.stringify(oursDansLeLocalStorage));
        popupAjoutPanier();
      } else {
        /*si produit pas présent dans le local storage*/
        oursDansLeLocalStorage = [];
        oursDansLeLocalStorage.push(ajoutOurs);
        localStorage.setItem("Ourson", JSON.stringify(oursDansLeLocalStorage));
        popupAjoutPanier();
      }
    });
  })
);
/*----------------------Fin------------*/
