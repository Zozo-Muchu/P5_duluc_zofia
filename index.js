/*-------------------le tableau panier------------------*/
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
