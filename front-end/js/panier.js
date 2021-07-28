/*-------------récupération des Ours sélectionnées pour le Panier--------------*/
let oursDansLeLocalStorage = JSON.parse(localStorage.getItem("Ourson"));
/*----------------apparition produit panier---------*/
const produitDansPanier = document.querySelector("#panier_Tableau");
/*si le panier des oursons est vide*/
if (oursDansLeLocalStorage === null || oursDansLeLocalStorage == 0) {
  const panierVide = `
  <div class="panier_sans_oursons">
  <h2>Vos futur oursons :</h2>
  <p>Pas d'oursons dans le panier </p>
  </div>`;
  produitDansPanier.innerHTML = panierVide;
} else {
  /*si le panier a des oursons*/
  let structurePanierOursons = [];
  for (j = 0; j < oursDansLeLocalStorage.length; j++) {
    structurePanierOursons =
      structurePanierOursons +
      `
    <div class="panier_recapitulatif_oursons">
            <div>${oursDansLeLocalStorage[j].nomOurs}</div>
            <div>Quantité: ${oursDansLeLocalStorage[j].quantiteOurs}</div>
            <div>${oursDansLeLocalStorage[j].prixOurs} </div>
            <button class="btn_suppression_ours"><i class="fas fa-trash-alt"></i></button>
        </div>`;
  }
  if (j === oursDansLeLocalStorage.length) {
    produitDansPanier.innerHTML = structurePanierOursons;
  }
}
/*-------------FIN récupération des Ours sélectionnées pour le Panier--------------*/
/*-------------BOUTON Suppression des ours---------------------*/
let btn_suppressionOurs = document.querySelectorAll(".btn_suppression_ours");
console.log(btn_suppressionOurs);
for (let l = 0; l < btn_suppressionOurs.length; l++) {
  btn_suppressionOurs[l].addEventListener("click", (e) => {
    e.preventDefault();
    /*sélection de l'id de l'ours qui doit être supprimé*/
    let supressionOursonSelectionner = oursDansLeLocalStorage[l].idOurs;

    /*suppression de l'élément avec la méthode filter*/
    oursDansLeLocalStorage = oursDansLeLocalStorage.filter(
      (el) => el.idOurs !== supressionOursonSelectionner
    );
    console.log(oursDansLeLocalStorage);
    localStorage.setItem("Ourson", JSON.stringify(oursDansLeLocalStorage));
    /*dire que l'ours a été supprimé et recharger la page*/
    alert("L'ourson a été bien supprimer du panier");
    window.location.href = "panier.html";
  });
}

/*-------------------------COOrdonnes a rectifier---------
function panierChargement() {
  let btnFormulaire = document.querySelector("button");
  btnFormulaire.addEventListener("click", () => {
    /*récupérer les données du formulaire
    let bister = document.querySelectorAll("input[name = 'bister']");

    for (i = 0; i < bister.length; i++) {
      if (bister[i].checked === true) {
        leBister = bister[i].value;
      }
    }

    /*stocker les donées dans le local storage
    localStorage.setItem("prenom", document.querySelector("#prenom").value);
    localStorage.setItem("nom", document.querySelector("#nom").value);
    localStorage.setItem("numero", document.querySelector("#numero").value);
    localStorage.setItem("bister", leBister);
    localStorage.setItem("rue", document.querySelector("#rue").value);
    localStorage.setItem(
      "codepostale",
      document.querySelector("#codepostale").value
    );
    localStorage.setItem("ville", document.querySelector("#ville").value);
    localStorage.setItem("email", document.querySelector("#email").value);

    location.href = "http://localhost:5500/front-end/recapitulatif.html";
  });
}

function recuperationLocalStorage() {
  /*récupérer les données du local storage et les faire apparaitre sur la page récapitulatif
  document.querySelector("#leprenom").innerHTML =
    localStorage.getItem("prenom");
  document.querySelector("#lenom").innerHTML = localStorage.getItem("nom");
  document.querySelector("#lenumero").innerHTML =
    localStorage.getItem("numero");
  document.querySelector("#leBister").innerHTML =
    localStorage.getItem("bister");
  document.querySelector("#larue").innerHTML = localStorage.getItem("rue");
  document.querySelector("#lecodepostale").innerHTML =
    localStorage.getItem("codepostale");
  document.querySelector("#laville").innerHTML = localStorage.getItem("ville");
  document.querySelector("#lemail").innerHTML = localStorage.getItem("email");
}*/
