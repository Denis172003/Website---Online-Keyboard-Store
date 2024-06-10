window.addEventListener("load", function () {
  this.document.getElementById("inp-pret").onchange = function () {
    document.getElementById("infoRange").innerHTML = `(${this.value})`;
  };

  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tipParam = urlParams.get('tip') || 'toate';

  document.getElementById("filtrare").addEventListener("click", function () {
    let inpNume = document.getElementById("inp-nume").value.toLowerCase().trim();

    let vRadio = document.getElementsByName("gr_rad");
    let inpTipTastatura;
    for (let r of vRadio) {
      if (r.checked) {
        inpTipTastatura = r.value.toLowerCase(); // Ensure the value is lowercase
        break;
      }
    }

    let inpPret = parseFloat(document.getElementById("inp-pret").value);

    let inpCateg = document.getElementById("inp-categorie").value.toLowerCase().trim();

    produse = document.getElementsByClassName("produs");
    for (let produs of produse) {
      let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
      let cond1 = valNume.startsWith(inpNume);

      let valTipTastatura = produs.getElementsByClassName("val-tip-tastatura")[0].innerHTML.toLowerCase().trim();
      let cond2 = inpTipTastatura === "toate" || inpTipTastatura === valTipTastatura;

      let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
      let cond3 = valPret >= inpPret;

      let valCateg = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase().trim();
      let cond4 = inpCateg === "toate" || inpCateg === valCateg;

      let valNumarTaste = parseInt(produs.getElementsByClassName("val-numar-taste")[0].innerHTML);
      let cond5 = (tipParam === "toate") ||
                  (tipParam === "100" && valNumarTaste >= 104) ||
                  (tipParam === "80" && valNumarTaste >= 87 && valNumarTaste < 104) ||
                  (tipParam === "60" && valNumarTaste < 87);

      if (cond1 && cond2 && cond3 && cond4 && cond5) {
        produs.style.display = "block";
      } else {
        produs.style.display = "none";
      }
    }
  });

  document.getElementById("resetare").onclick = function () {
    document.getElementById("inp-nume").value = "";
    document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
    document.getElementById("inp-categorie").value = "toate";
    document.getElementById("i_rad4").checked = true;
    var produse = document.getElementsByClassName("produs");
    document.getElementById("infoRange").innerHTML = "(0)";
    for (let prod of produse) {
      prod.style.display = "block";
    }
  };

  function sorteaza(semn) {
    var produse = document.getElementsByClassName("produs");
    var v_produse = Array.from(produse);
    v_produse.sort(function (a, b) {
      let pret_a = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
      let pret_b = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
      if (pret_a === pret_b) {
        let nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
        let nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
        return semn * nume_a.localeCompare(nume_b);
      }
      return semn * (pret_a - pret_b);
    });
    let container = document.getElementById("produse").getElementsByClassName("row")[0];
    for (let prod of v_produse) {
      container.appendChild(prod);
    }
  }

  document.getElementById("sortCrescNume").onclick = function () {
    sorteaza(1);
  };

  document.getElementById("sortDescrescNume").onclick = function () {
    sorteaza(-1);
  };

  window.onkeydown = function (e) {
    if (e.key == "c" && e.altKey) {
      var suma = 0;
      var produse = document.getElementsByClassName("produs");
      for (let produs of produse) {
        var stil = getComputedStyle(produs);
        if (stil.display != "none") {
          suma += parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
        }
      }
      if (!document.getElementById("par_suma")) {
        let p = document.createElement("p");
        p.innerHTML = `<b>${suma}</b>`;
        p.id = "par_suma";
        container = document.getElementById("produse");
        container.insertBefore(p, container.children[0]);
        setTimeout(function () {
          let par = document.getElementById("par_suma");
          if (par) {
            par.remove();
          }
        }, 2000);
      }
    }
  };

// Function to find the cheapest product in each category
function markCheapestProducts() {
  const categories = new Set(); // Set to store unique categories
  const cheapestProducts = {}; // Object to store cheapest product for each category

  // Loop through each product to find the cheapest in each category
  const products = document.getElementsByClassName("produs");
  for (let product of products) {
    const category = product.getElementsByClassName("val-categorie")[0].textContent.toLowerCase().trim();
    const price = parseFloat(product.getElementsByClassName("val-pret")[0].textContent);

    // If category is not in the set, add it and set the initial cheapest product
    if (!categories.has(category)) {
      categories.add(category);
      cheapestProducts[category] = { price: price, element: product };
    } else {
      // If category already exists, check if the current product is cheaper
      if (price < cheapestProducts[category].price) {
        cheapestProducts[category] = { price: price, element: product };
      }
    }
  }

  // Mark the cheapest product in each category
  for (let category in cheapestProducts) {
    const cheapestProduct = cheapestProducts[category].element;
    const priceElement = cheapestProduct.getElementsByClassName("val-pret")[0];
    priceElement.style.color = "red"; // Example: Marking the price in red to draw attention

    // Create and append a yellow text box on top of the "Cel mai ieftin produs" message
    const yellowBox = document.createElement("div");
    yellowBox.classList.add("yellow-box");
    yellowBox.textContent = "Cel mai ieftin produs";
    priceElement.appendChild(yellowBox);
  }
}

// Call the function to mark the cheapest products once the page is loaded
markCheapestProducts();


  // Apply the tip filter on page load
  document.getElementById("filtrare").click();
});
