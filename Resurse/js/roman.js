
// Funcție pentru a converti numărul în cifre romane mici
function convertToRoman(num) {
    const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]; // Adaugă și alte valori pentru a acoperi mai multe cazuri
    if (num >= 1 && num <= romanNumerals.length) {
        return romanNumerals[num - 1];
    } else {
        return num.toString(); // În cazul în care numărul depășește limita, returnează numărul ca string
    }
}
