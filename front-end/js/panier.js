/*-------------récupération des Ours sélectionnées pour les affiché dans le panier--------------*/
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
            <div class="ours_local_panier">${oursDansLeLocalStorage[j].nomOurs}</div>
            <div class="ours_quantite_panier">Quantité: ${oursDansLeLocalStorage[j].quantiteOurs}</div>
            <div class="ours_prix_panier">${oursDansLeLocalStorage[j].prixOurs} </div>
            <button class="btn_suppression_ours"><i class="fas fa-trash-alt"></i></button>
        </div>`;
  }
  if (j === oursDansLeLocalStorage.length) {
    produitDansPanier.innerHTML = structurePanierOursons;
  }
}
/*-------------FIN récupération des Ours sélectionnées pour le Panier--------------*/

/*-------------calcul montant du panier-----------*/
let prixTotalCalcul = [];
for (let u = 0; u < oursDansLeLocalStorage.length; u++) {
  let prixTotalPanier = parseInt(oursDansLeLocalStorage[u].prixOurs);
  /*mettre les prix dans une variable*/
  prixTotalCalcul.push(prixTotalPanier);
}
/*utilisation de la méthode reduce*/
let reducer = (accumulateur, valeurCourante) => accumulateur + valeurCourante;
let prixTotal = prixTotalCalcul.reduce(reducer, 0);
/* ajout du prix total dans le HTML*/
const calcul_prix_total = `
<div class= "calcul_prix_total"> Le prix total des Oursons est : <span> ${prixTotal} €</span></div>`;
/*insertion du code dans le HTML*/
produitDansPanier.insertAdjacentHTML("beforeend", calcul_prix_total);

/*---fin calcul montant panier---*/
/*-------------BOUTON Suppression des ours un à un ---------------------*/
let btn_suppressionOurs = document.querySelectorAll(".btn_suppression_ours");
for (let l = 0; l < btn_suppressionOurs.length; l++) {
  btn_suppressionOurs[l].addEventListener("click", (e) => {
    e.preventDefault();
    /*sélection de l'id de l'ours qui doit être supprimé*/
    let supressionOursonSelectionner = oursDansLeLocalStorage[l].idOurs;

    /*suppression de l'élément avec la méthode filter*/
    oursDansLeLocalStorage = oursDansLeLocalStorage.filter(
      (el) => el.idOurs !== supressionOursonSelectionner
    );
    localStorage.setItem("Ourson", JSON.stringify(oursDansLeLocalStorage));
    /*dire que l'ours a été supprimé et recharger la page*/
    alert("L'ourson a été bien supprimer du panier");
    window.location.href = "panier.html";
  });
}
/*-------------bouton vider le panier-------------------*/
/*code html du bouton à afficher sur dans le panier*/
const btn_viderPanier = `
<button class="btn_vide_panier"> Vider le panier </button> 
`;
/*insertion du bouton dans le panier*/
produitDansPanier.insertAdjacentHTML("beforeend", btn_viderPanier);
/* sélection du bouton qui vide le panier*/
const btn_vide_panier = document.querySelector(".btn_vide_panier");

/*suppresion de "ourson" dans le local storage*/
btn_vide_panier.addEventListener("click", (e) => {
  e.preventDefault;
  localStorage.removeItem("Ourson");
  alert("le panier est vidé");
  window.location.href = "panier.html";
});
/*-------------------fin bouton vider le panier--------*/
/*-----------------*formulaire---------------------------*/
const afficherFormulaire = () => {
  /*sélection de l'éléments du DOM*/
  const positionformulaire = document.querySelector("#panier_Tableau");
  const htmlFormulaire = `
<h2 class="coordonees">Coordonnées</h2>
<form class="coordonees_formulaire">
    <p>
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" required placeholder="Laurent"><br/>

        <label for="nom">Nom</label>
        <input type="text" name="nom" id="nom" required placeholder="DURANT"><br/>

        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" id="adresse" required placeholder="rue des patates"><br/>

        <label for="ville">Ville</label>
        <input type="text" name="ville" id="ville" required placeholder="Marseille"><br/>

        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" required placeholder="laurent.durant@gmail.com">
    </p>
    <button  type="submit" id="btn_envoie_formulaire">Allons-y !!</button>
</form>`;
  /*injection HTML*/
  positionformulaire.insertAdjacentHTML("afterend", htmlFormulaire);
};
/*appel de la fonction pour appeler le formulaire*/
afficherFormulaire();

/*Envoie des donées du formulaire*/

function envoieFormulaire() {
  let formulaire = document.getElementsByClassName("coordonees_formulaire");
  formulaire[0].addEventListener("submit", function (e) {
    e.preventDefault();
    if (formulaireValide(prenom, nom, adresse, ville, email) != true) {
      alert(formulaireValide(prenom, nom, adresse, ville, email));
    } else {
      /*fonction qui renvoie vers le backend*/
      let prenom = document.querySelector("#prenom").value;
      let nom = document.querySelector("#nom").value;
      let adresse = document.querySelector("#adresse").value;
      let ville = document.querySelector("#ville").value;
      let email = document.querySelector("#email").value;
      envoieVersAPI(
        prenom,
        nom,
        adresse,
        ville,
        email,
        oursDansLeLocalStorage,
        "http://localhost:3000/api/teddies"
      );
    }
  });
}
function formulaireValide(idPrenom, idNom, idAdresse, idVille, idEmail) {
  if (idPrenom.value == "") {
    return "Votre prénom est demandé";
  }
  if (idNom.value == "") {
    return "Votre Nom est demandé";
  }
  if (idAdresse.value == "") {
    return "Votre adresse d'expédition est demandé";
  }
  if (idVille.value == "") {
    return "Renseignez votre ville";
  }
  if (idEmail.value == "") {
    return "Renseignez une adresse e-mail valide";
  }
  return true;
}
function envoieVersAPI(
  yprenom,
  ynom,
  yadresse,
  yville,
  yemail,
  tabOurs,
  postUrl
) {
  let idTabOurs = tabOurs.map(
    (i) => i.id
  ); /*création d'un tableau pour les id du*/
  let msg = {
    contact: {
      firstName: yprenom,
      lastName: ynom,
      adress: yadresse,
      city: yville,
      email: yemail,
    },
    products: idTabOurs,
  };
  let options = {
    method: "POST",
    body: JSON.stringify(msg),
    headers: new Headers({ "Content-Type": "application/json" }),
  };
  fetch(postUrl + "/order", options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("idCommande", res["orderId"]);
      localStorage.setItem("total", prixTotal);
      window.location.href =
        "http://localhost:5500/front-end/recapitulatif.html";
    })
    .catch((error) => console.log(error));
}
