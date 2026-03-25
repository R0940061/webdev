let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    deck: [],             // Hier komen alle bestandsnamen in
    turnedCards: [],      // Om bij te houden op welke 2 kaarten geklikt is
    isBusy: false,        // Blokkeert klikken tijdens de wachttijd
    matchesFound: 0       // Houdt bij of we gewonnen hebben
};

const setup = () => {
    let board = document.getElementById("memoryBoard");

    // 1. Vul het deck met 2x elke kaart
    for (let i = 1; i <= global.AANTAL_KAARTEN; i++) {
        global.deck.push("kaart" + i + ".png");
        global.deck.push("kaart" + i + ".png");
    }

    // 2. Schud de kaarten willekeurig
    global.deck.sort(() => Math.random() - 0.5);

    // 3. Bouw de kaarten op het scherm
    for (let i = 0; i < global.deck.length; i++) {
        let img = document.createElement("img");
        img.src = "images/achterkant.png"; // Toon enkel de achterkanten
        img.className = "card";

        // We slaan de echte bestandsnaam stiekem op in een data-attribuut
        img.dataset.cardName = global.deck[i];

        // Hier is de verwijzing naar de draaiKaart functie die hieronder staat
        img.addEventListener("click", draaiKaart);
        board.appendChild(img);
    }
};

const draaiKaart = (event) => {
    // Als we even moeten wachten (fout geraden), negeer dan kliks
    if (global.isBusy) return;

    let clickedCard = event.target;

    // Klikken op een reeds omgedraaide of verborgen kaart mag geen effect hebben
    if (clickedCard.classList.contains("turned") || clickedCard.classList.contains("hidden")) return;

    // Draai de kaart om (verander src) en voeg class toe
    clickedCard.src = "images/" + clickedCard.dataset.cardName;
    clickedCard.classList.add("turned");
    global.turnedCards.push(clickedCard);

    // Controleer of we er nu 2 hebben omgedraaid
    if (global.turnedCards.length === 2) {
        global.isBusy = true; // Blokkeer nieuwe kliks
        controleerMatch();
    }
};

const controleerMatch = () => {
    let card1 = global.turnedCards[0];
    let card2 = global.turnedCards[1];

    if (card1.dataset.cardName === card2.dataset.cardName) {
        // MATCH!
        card1.classList.add("correct");
        card2.classList.add("correct");

        // Wacht 1 seconde en verberg de kaarten
        setTimeout(() => {
            card1.classList.add("hidden");
            card2.classList.add("hidden");
            resetBeurt();

            // Check of het spel ten einde is
            global.matchesFound++;
            if (global.matchesFound === global.AANTAL_KAARTEN) {
                alert("Gefeliciteerd! Je hebt alles gevonden!");
            }
        }, 1000);

    } else {
        // FOUT!
        card1.classList.add("wrong");
        card2.classList.add("wrong");

        // Wacht 1 seconde en draai de kaarten weer terug
        setTimeout(() => {
            card1.src = "images/achterkant.png";
            card2.src = "images/achterkant.png";
            card1.classList.remove("turned", "wrong");
            card2.classList.remove("turned", "wrong");
            resetBeurt();
        }, 1000);
    }
};

const resetBeurt = () => {
    // Leeg de array en geef het bord weer vrij
    global.turnedCards = [];
    global.isBusy = false;
};

// Start het spel pas als de pagina geladen is
window.addEventListener("load", setup);