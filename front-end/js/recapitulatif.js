/*récupérationde l'id*/
let IdCommande = localStorage.getItem("idCommande");
let total = localStorage.getItem("total");
let recapitulatif = document.getElementById("recap");
let recapId = `<h2> Merci pour votre Commande <br/>
Elle a bien été prise en compte</h2>
<p> Votre numéro de commande est le : <span>${IdCommande}</span></p>
<p>Le montant total de votre commande est de : <span>${total} €</span></p>
<p class="remerciement">Orinoco vous remercie de votre commande</p>`;
recapitulatif.innerHTML = recapId;
