/*récupérationde l'id*/
console.log("test1");
let IdCommande = localStorage.getItem("idCommande");
let total = localStorage.getItem("total");
console.log("test2");
let recapitulatif = document.getElementById("recap");
let recapId = `<h2> Merci pour votre Commande <br/>
Elle a bien été prise en compte</h2>
<p> votre numéro de commande est le : <span>${IdCommande}</p>
<p>Le montant total de votre commande est de : <span>${total} €</span></p>
<p>Orinoco vous remercie de votre commande</p>`;
console.log("test3");
recapitulatif.innerHTML = recapId;
console.log("test4");
