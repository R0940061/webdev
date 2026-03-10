// Opdracht 2.9: Formwaarden
// Lees de waarden van het formulier en toon ze op de console.

const setup = () => {

    document.getElementById("btnToon").addEventListener("click", () => {
        // 1. Checkbox: Is roker
        const isRoker = document.getElementById("roker").checked;
        console.log(isRoker ? "is roker" : "is geen roker");

        // 2. Radiobutton: Moedertaal
        const radioButtons = document.getElementsByName("moedertaal");
        let moedertaal = null;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                moedertaal = radioButtons[i].value;
                break;
            }
        }
        if (moedertaal !== null) {
            console.log("moedertaal is " + moedertaal);
        } else {
            console.log("geen moedertaal geselecteerd");
        }

        // 3. Enkelvoudige select: Favoriete buurland
        const buurlandSelect = document.getElementById("buurland");
        const buurland = buurlandSelect.options[buurlandSelect.selectedIndex].value;
        console.log("favoriete buurland is " + buurland);

        // 4. Multi-select: Bestelling
        const bestellingSelect = document.getElementById("bestelling");
        const geselecteerd = [];
        for (let i = 0; i < bestellingSelect.options.length; i++) {
            if (bestellingSelect.options[i].selected) {
                geselecteerd.push(bestellingSelect.options[i].value);
            }
        }
        console.log("bestelling bestaat uit " + geselecteerd.join(" "));
    });

};

window.addEventListener("load", setup);