const setup = () => {
    let btnSubstring = document.getElementById("btnSubstring");
    btnSubstring.addEventListener("click", maakSubstring);
}

const maakSubstring = () => {
    // 1. Haal de tekst op
    let txtTekst = document.getElementById("txtTekst");
    let tekst = txtTekst.value;

    // 2. Haal de nummers op (vergeet niet dat inputs strings zijn, dus gebruik parseInt)
    let txtIndex1 = document.getElementById("txtIndex1");
    let start = parseInt(txtIndex1.value);

    let txtIndex2 = document.getElementById("txtIndex2");
    let einde = parseInt(txtIndex2.value);

    // 3. Pas de substring functie toe
    // Let op: substring(start, einde) pakt tekens VANAF start TOT (maar niet inclusief) einde.
    let resultaat = tekst.substring(start, einde);

    // 4. Toon het resultaat
    let txtOutput = document.getElementById("txtOutput");
    txtOutput.innerHTML = resultaat;
}

window.addEventListener("load", setup);