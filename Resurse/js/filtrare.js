// Eveniment pentru salvarea filtrării la bifarea checkbox-ului
var checkboxSalvare = document.getElementById('salveaza-filtrare');
checkboxSalvare.addEventListener('change', function() {
    if (checkboxSalvare.checked) {
        salveazaFiltrare();
    } else {
        localStorage.removeItem('ultimaFiltrare');
    }
});

// Eveniment pentru resetarea filtrării
var btnResetare = document.getElementById('resetare');
btnResetare.addEventListener('click', function() {
    checkboxSalvare.checked = false;
    localStorage.removeItem('ultimaFiltrare');
    // Resetăm și valorile input-urilor de filtrare
    document.getElementById('inp-nume').value = '';
    document.querySelector('input[name="gr_rad"][value="toate"]').checked = true;
    document.getElementById('inp-pret').value = 0;
    document.getElementById('inp-categorie').value = 'toate';
    // Apelăm funcția de filtrare pentru a afișa toate produsele
    filtrareProduse();
});

// Funcție pentru filtrarea produselor
function filtrareProduse() {
    // Implementați filtrarea produselor în funcție de valorile curente din input-uri
    // Această funcție trebuie să fie adaptată pentru a filtra lista de produse în funcție de criteriile selectate
    // și să actualizeze afișarea acestora în pagină.
}

// Apelăm funcția de restaurare a filtrării salvate la încărcarea paginii
window.addEventListener('DOMContentLoaded', function() {
    restaureazaFiltrareSalvata();
});
