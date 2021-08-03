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
<div class= "calcul_prix_total"> Le prix total des oursons est : <span> ${prixTotal} €</span></div>`;
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
