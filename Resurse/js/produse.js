window.addEventListener("load", function () {
    document.getElementById("inp-pret").onchange = function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`;
    };

    const urlParams = new URLSearchParams(window.location.search);
    const tipParam = urlParams.get('tip') || 'toate';

    document.getElementById("filtrare").addEventListener("click", filtrare);

    document.getElementById("resetare").onclick = function () {
        if (confirm("Vrei cu adevărat să resetezi filtrele?")) {
            document.getElementById("inp-nume").value = "";
            document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
            document.getElementById("inp-categorie").value = "toate";
            document.getElementById("i_rad4").checked = true;
            var produse = document.getElementsByClassName("produs");
            document.getElementById("infoRange").innerHTML = "(0)";
            for (let prod of produse) {
                prod.style.display = "block";
            }
            markCheapestProducts(); 
        }
    };

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

    function filtrare() {
        let inpNume = document.getElementById("inp-nume").value.toLowerCase().trim();

        let vRadio = document.getElementsByName("gr_rad");
        let inpTipTastatura;
        for (let r of vRadio) {
            if (r.checked) {
                inpTipTastatura = r.value.toLowerCase();
                break;
            }
        }
  
        let selectedServicii = [];

        // Obține elementul select pentru servicii
        let selectServicii = document.getElementById("select-servicii");
    
        // Obține opțiunile selectate din selectul multiplu pentru servicii
        Array.from(selectServicii.selectedOptions).forEach(option => {
            selectedServicii.push(option.value.toLowerCase().trim());
        });
        let inpPret = parseFloat(document.getElementById("inp-pret").value);

        let inpCateg = document.getElementById("inp-categorie").value.toLowerCase().trim();

        let inpConectivitate = document.getElementById("inp-conectivitate").value.toLowerCase().trim();


        let inpDescriere = document.getElementById("inp-descriere").value.toLowerCase().trim();
        let selectedOptions = Array.from(document.getElementById("inp-specificatii").selectedOptions).map(option => option.value.toLowerCase().trim());

        let produse = document.getElementsByClassName("produs");
        for (let produs of produse) {

            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            let cond1 = areNumeApropiat(valNume, inpNume);

            let valTipTastatura = produs.getElementsByClassName("val-tip-tastatura")[0].innerHTML.toLowerCase().trim();
            let cond2 = inpTipTastatura === "toate" || inpTipTastatura === valTipTastatura;

            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3 = valPret >= inpPret;

            let valCateg = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase().trim();
            let cond4 = inpCateg === "toate" || inpCateg === valCateg;

            let valConectivitate = produs.getElementsByClassName("val-conectivitate")[0].innerHTML.toLowerCase().trim();
            let cond5 = inpConectivitate === "" || valConectivitate.includes(inpConectivitate);

            let valServicii = produs.getElementsByClassName("val-servicii")[0].innerHTML.toLowerCase().trim();
            let cond6 = selectedServicii.length === 0 || selectedServicii.some(service => valServicii.includes(service));

            let valDescriere = produs.getElementsByClassName("val-descriere")[0].innerHTML.toLowerCase().trim();
            let cond7 = inpDescriere === "" || valDescriere.includes(inpDescriere);

            let valSpecificatii = produs.getElementsByClassName("val-specificatii")[0].innerHTML.toLowerCase().trim();
            let cond8 = selectedOptions.length === 0 || selectedOptions.every(option => valSpecificatii.includes(option));

            let valNumarTaste = parseInt(produs.getElementsByClassName("val-numar-taste")[0].innerHTML);
            let cond9 = (tipParam === "toate") ||
                        (tipParam === "100" && valNumarTaste >= 104) ||
                        (tipParam === "80" && valNumarTaste >= 87 && valNumarTaste < 104) ||
                        (tipParam === "60" && valNumarTaste < 87);

            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8 && cond9) {
                produs.style.display = "block";
            } else {
                produs.style.display = "none";
            }
        }

        markCheapestProducts(); // Update cheapest products after filtering
    }

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

    document.getElementById('filtrare').addEventListener('click', function () {
        const produse = document.querySelectorAll('.produs');
        const compatibilitateOptiune = document.querySelector('input[name="compatibilitate_optiune"]:checked').value;
        const selectedCompatibilitate = Array.from(document.querySelectorAll('input[name="gr_compatibilitate"]:checked')).map(cb => cb.value);

        produse.forEach(produs => {
            const prodCompatibilitateText = produs.querySelector('.val-specificatii').textContent;
            const hasMultipleCompatibilitate = selectedCompatibilitate.every(opt => prodCompatibilitateText.includes(opt));

            let shouldShow = false;
            if (compatibilitateOptiune === 'are') {
                shouldShow = hasMultipleCompatibilitate;
            } else {
                shouldShow = !hasMultipleCompatibilitate;
            }

            if (shouldShow) {
                produs.classList.remove('d-none');
            } else {
                produs.classList.add('d-none');
            }
        });
    });


    function areNumeApropiat(numeReal, numeIntrodus) {
        if (numeReal === numeIntrodus) {
            return true;
        }
        
        // Verificăm similaritatea utilizând o metodă simplă de calcul a diferenței de caractere
        let diffCount = 0;
        const len = Math.min(numeReal.length, numeIntrodus.length);
        for (let i = 0; i < len; i++) {
            if (numeReal[i] !== numeIntrodus[i]) {
                diffCount++;
            }
            if (diffCount > 2) {
                return false;
            }
        }
        return diffCount <= 2;
    }

    function markCheapestProducts() {
        const categorii = new Set(); // Set to store unique categories
        const produseCeleMaiIeftine = {}; // Object to store cheapest product for each category

        // Iterate through each product to find the cheapest in each category
        const produse = document.getElementsByClassName("produs");
        for (let produs of produse) {
            
            const categorie = produs.getElementsByClassName("val-categorie")[0].textContent.toLowerCase().trim();
            const pret = parseFloat(produs.getElementsByClassName("val-pret")[0].textContent);

            // If the category is not in the set, add it and set the initial cheapest product
            if (!categorii.has(categorie)) {
                categorii.add(categorie);
                produseCeleMaiIeftine[categorie] = { pret: pret, element: produs };
            } else {
                // If the category already exists, check if the current product is cheaper
                if (pret < produseCeleMaiIeftine[categorie].pret) {
                    produseCeleMaiIeftine[categorie] = { pret: pret, element: produs };
                }
            }
        }

        // Remove previous marking before re-marking
        const markedProducts = document.querySelectorAll('.produs .val-pret');
        markedProducts.forEach(priceElement => {
            priceElement.style.color = ''; // Reset text color
            const yellowBox = priceElement.querySelector('.yellow-box');
            if (yellowBox) {
                yellowBox.remove(); // Remove previous "Cel mai ieftin produs" marker
            }
        });

        // Mark cheapest product in each category
        for (let category in produseCeleMaiIeftine) {
            const cheapestProduct = produseCeleMaiIeftine[category].element;
            const priceElement = cheapestProduct.getElementsByClassName("val-pret")[0];
            priceElement.style.color = "red";

            const yellowBox = document.createElement("div");
            yellowBox.classList.add("yellow-box");
            yellowBox.textContent = "Cel mai ieftin produs";
            priceElement.appendChild(yellowBox);
        }
    }

    markCheapestProducts();

    document.getElementById('calculeazaMedia').addEventListener('click', function() {
        // Selectăm toate elementele cu clasa val-pret
        const elements = document.getElementsByClassName('val-pret');
    
        let total = 0;
        let count = 0;
    
        // Iterăm prin elementele selectate și adunăm prețurile
        for (let i = 0; i < elements.length; i++) {
            const pret = parseFloat(elements[i].innerText.trim()); // presupunând că textul conține prețul într-un format numeric
            if (!isNaN(pret)) {
                total += pret;
                count++;
            }
        }
    
        // Calculăm media
        const media = count > 0 ? total / count : 0;
    
        // Afisăm rezultatul (poți folosi console.log(media) pentru a verifica în consolă)
        alert(`Media prețurilor selectate este: ${media.toFixed(2)}`); // afișăm media cu două zecimale
    });
    

    document.getElementById('resetare').addEventListener('click', function () {
        deleteCookie("filters");
        location.reload();
    });

    document.getElementById("filtrare").click(); // Initial filter products on page load
});
