const setup = () => {
    // Definieer de tekst en de zoekterm
    const tekst = "De man van An geeft geen hand aan ambetante verwanten";
    const zoekterm = "an";

    // ----------------------------------------------------
    // Methode 1: Tellen met indexOf (zoeken van links naar rechts)
    // ----------------------------------------------------
    let aantalIndexOf = 0;
    let index = tekst.indexOf(zoekterm);

    while (index !== -1) {
        aantalIndexOf++;
        // Zoek verder vanaf het karakter ná de huidige vondst
        index = tekst.indexOf(zoekterm, index + 1);
    }

    // Zet het resultaat in de console en op de webpagina
    console.log(`Aantal gevonden met indexOf: ${aantalIndexOf}`);
    document.getElementById("resultaat-indexof").innerText = `Met indexOf gevonden: ${aantalIndexOf} keer`;

    // ----------------------------------------------------
    // Methode 2: Tellen met lastIndexOf (zoeken van rechts naar links)
    // ----------------------------------------------------
    let aantalLastIndexOf = 0;
    let lastIndex = tekst.lastIndexOf(zoekterm);

    while (lastIndex !== -1) {
        aantalLastIndexOf++;

        // Zorg ervoor dat we niet vastlopen als de zoekterm helemaal vooraan (index 0) staat
        if (lastIndex === 0) {
            break;
        }

        // Zoek verder vanaf het karakter vóór de huidige vondst
        lastIndex = tekst.lastIndexOf(zoekterm, lastIndex - 1);
    }

    // Zet het resultaat in de console en op de webpagina
    console.log(`Aantal gevonden met lastIndexOf: ${aantalLastIndexOf}`);
    document.getElementById("resultaat-lastindexof").innerText = `Met lastIndexOf gevonden: ${aantalLastIndexOf} keer`;
}

// Deze code wordt pas uitgevoerd als de pagina volledig is ingeladen
window.addEventListener("load", setup);