/*-----------------Appel du back end dans acceuil------------------------*/
let url = " http://localhost:3000/api/teddies";
/*---lien vers le serveur-----*/
let list_teddy = "";
fetch(url).then((response) =>
  response.json().then((data) => {
    /*----récupération des données---*/
    for (let teddy of data) {
      list_teddy += `<li><a href="oursbrun.html?_id=${
        teddy._id
      }" class="button">
        <img src="${teddy.imageUrl}"/>
        <h2>${teddy.name}</h2>
        <div>${teddy.description}"</div>
        <div class="price">${teddy.price / 100}€</div>
        </a>`;
    }
    console.log(list_teddy);
    document.querySelector("#groupe_ours").innerHTML = list_teddy;
  })
);
