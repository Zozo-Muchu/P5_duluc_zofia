function panierChargement() {
  let btnFormulaire = document.querySelector("button");
  console.log(btnFormulaire);

  btnFormulaire.addEventListener("click", () => {
    /*récupérer les données du formulaire*/
    let bister = document.querySelectorAll("input[name = 'bister']");

    for (i = 0; i < bister.length; i++) {
      if (bister[i].checked === true) {
        leBister = bister[i].value;
      }
    }

    /*stocker les donées dans le local storage*/
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
  /*récupérer les données du local storage et les faire apparaitre sur la page récapitulatif*/
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
}
