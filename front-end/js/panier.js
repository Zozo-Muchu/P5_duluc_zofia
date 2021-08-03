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
console.log(produitDansPanier);

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
        
        <label for="codepostale">Code Postale</label>
        <input type="number" name="codepostale" id="codepostale" required placeholder="72000">

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

/*Sélection du bouton du formulaire*/
const btnEnvoieFormulaire = document.querySelector("#btn_envoie_formulaire");
/*--------addEventListener-------*/
btnEnvoieFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  /* récupération des valeurs du formulaires*/
  const valeursDesFormulaires = {
    prenom: document.querySelector("#prenom").value,
    nom: document.querySelector("#nom").value,
    adresse: document.querySelector("#adresse").value,
    codePostale: document.querySelector("#codepostale").value,
    ville: document.querySelector("#ville").value,
    email: document.querySelector("#email").value,
  };
  /*---- mettre le formulaire dans le local storage dans une seule clé*/
  localStorage.setItem(
    "valeursDesFormulaires",
    JSON.stringify(valeursDesFormulaires)
  );

  /*les valeurs du formulaire et ls ours sélectionner envoyé vers le serveur*/
  const envoie = {
    oursDansLeLocalStorage,
    valeursDesFormulaires,
  };
  console.log(envoie);
  /*envoie de "envoie" vers le serveur
  const promesseDeVente = fetch(
    ?,
    {
      method: "POST",
      body: JSON.stringify(envoie),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );*/
});
console.log(promesseDeVente);
