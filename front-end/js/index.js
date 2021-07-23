/*---------------- essai prix des ours celon taille--------------------
const oursPrix = document.querySelector(".ours_prix");
const trente = document.getElementById("trente");
const cinquante = document.getElementById("cinquante");
const soixante = document.getElementById("soixante");
const quatrevingt = document.getElementById("quatrevingt");

trente.addEventListener("click", () => {
  oursPrix.innerHTML = 25 + "€";
});

cinquante.addEventListener("click", () => {
  oursPrix.innerHTML = 30 + "€";
});

soixante.addEventListener("click", () => {
  oursPrix.innerHTML = 35 + "€";
});

quatrevingt.addEventListener("click", () => {
  oursPrix.innerHTML = 45 + "€";
});
---*/

/*-----------------------fin prix des ours celon taille -----------*/

/*------------------------tableau achats produits du panier-------------------*/
/*-----ESSAI echec-----

function Products(photo, nom, prix) {
  (this.photo = photo), (this.nom = nom), (this.prix = prix);
}

const product1 = new Products("image/teddy_1.jpg", "Ours brun", 20);
const product2 = new Products("image/teddy_2.jpg", "Ours creme", 25);
const product3 = new Products("image/teddy_3.jpg", "Ours duo", 40);
const product4 = new Products("image/teddy_4.jpg", "Ours tee-shirt", 30);
const product5 = new Products("image/teddy_5.jpg", "Ours doux", 30);

let products = [];
products.push(product1, product2, product3, product4, product5);

function populateTableList() {
  let listOfProducts = "";

  products.forEach(
    (prod) =>
      (listOfProducts += `
    <tr>
      <td><img src=${prod.pic}></td>
    `)
  );
}
document.getElementById("productList").innerHTML = listOfProducts;

--*/
/*-----------------appel du back end dans acceuil------------------------*/
let url = " http://localhost:3000/api/teddies";
/*---lien vers le serveur-----*/
let list_teddy = "";
fetch(url).then((response) =>
  response.json().then((data) => {
    /*----récupération des données---*/
    for (let teddy of data) {
      list_teddy += `<li><a href="oursbrun.html?_id=${teddy._id}" class="button">
        <img src="${teddy.imageUrl}"/>
        <h2>${teddy.name}</h2>
        <div>${teddy.description}"</div>
        <div class="price">${teddy.price}€</div>
        </a>`;
    }
    console.log(list_teddy);
    document.querySelector("#groupe_ours").innerHTML = list_teddy;
  })
);