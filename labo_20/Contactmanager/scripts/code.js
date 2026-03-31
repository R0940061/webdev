let personen = [];

// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    // valideer alle input data en controleer of er geen errors meer zijn
    valideer();

    // Controleer of er nog elementen zijn met class "invalid" (deze class wordt door validatie.js gezet)
    let invalidElements = document.getElementsByClassName("invalid");
    if (invalidElements.length > 0) {
        // Er zijn fouten, dus we mogen niet opslaan!
        return;
    }

    // Geen fouten? Dan lezen we de data uit de velden
    let voornaam = document.getElementById("txtVoornaam").value.trim();
    let familienaam = document.getElementById("txtFamilienaam").value.trim();
    let geboorteDatum = document.getElementById("txtGeboorteDatum").value.trim();
    let email = document.getElementById("txtEmail").value.trim();
    let aantalKinderen = document.getElementById("txtAantalKinderen").value.trim();

    // We kijken naar de geselecteerde index in de lijst
    let lstPersonen = document.getElementById("lstPersonen");
    let selectedIndex = lstPersonen.selectedIndex;

    if (selectedIndex === -1) {
        // Er is NIETS geselecteerd in de lijst, dit is dus een NIEUWE persoon
        // We maken een object literal
        let nieuwePersoon = {
            voornaam: voornaam,
            familienaam: familienaam,
            geboorteDatum: new Date(geboorteDatum), // Zet String om naar Date object
            email: email,
            aantalKinderen: parseInt(aantalKinderen)
        };
        // Voeg achteraan toe aan de array
        personen.push(nieuwePersoon);
    } else {
        // Er was wel iets geselecteerd, we gaan de BESTAANDE persoon bewerken
        let bestaandePersoon = personen[selectedIndex];
        bestaandePersoon.voornaam = voornaam;
        bestaandePersoon.familienaam = familienaam;
        bestaandePersoon.geboorteDatum = new Date(geboorteDatum);
        bestaandePersoon.email = email;
        bestaandePersoon.aantalKinderen = parseInt(aantalKinderen);
    }

    // Ongeacht of het nieuw of bewerkt is: update de visuele lijst
    updatePersonenLijst();
};

// Event listener (btnNieuw click)
const bewerkNieuwePersoon = () => {
    // Deselecteer in de lijst
    document.getElementById("lstPersonen").selectedIndex = -1;

    // Maak alle inputvelden leeg
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";

    // Wis eventuele oude foutmeldingen (Functie uit validatie.js)
    clearAllErrors();
};

// Functie die wordt getriggerd als je in de select list op een naam klikt
const toonPersoonDetails = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    let selectedIndex = lstPersonen.selectedIndex;

    // Haal de juiste persoon uit de array
    let persoon = personen[selectedIndex];

    // Vul de UI velden met de data
    document.getElementById("txtVoornaam").value = persoon.voornaam;
    document.getElementById("txtFamilienaam").value = persoon.familienaam;

    // We moeten het datum object terug omzetten naar een string YYYY-MM-DD
    // Omdat .getMonth() nul-gebaseerd is, doen we +1.
    // .padStart(2, '0') zorgt ervoor dat bijv. '4' wordt omgezet naar '04'
    let jaar = persoon.geboorteDatum.getFullYear();
    let maand = String(persoon.geboorteDatum.getMonth() + 1).padStart(2, '0');
    let dag = String(persoon.geboorteDatum.getDate()).padStart(2, '0');
    document.getElementById("txtGeboorteDatum").value = jaar + "-" + maand + "-" + dag;

    document.getElementById("txtEmail").value = persoon.email;
    document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;

    // Wis eventuele oude foutmeldingen
    clearAllErrors();
};

// Hulpmethode om de <select> (listbox) opnieuw op te bouwen op basis van de array
const updatePersonenLijst = () => {
    let lstPersonen = document.getElementById("lstPersonen");

    // Maak de lijst eerst helemaal leeg
    lstPersonen.innerHTML = "";

    // Loop door de array en voeg voor elke persoon een <option> toe
    for (let i = 0; i < personen.length; i++) {
        let persoon = personen[i];
        let option = document.createElement("option");

        // De weergavetekst (bv: "Janssens Jan")
        option.text = persoon.familienaam + " " + persoon.voornaam;
        // De value (of ID) is simpelweg de index in de array
        option.value = i;

        lstPersonen.appendChild(option);
    }
};

// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    // voeg een change listener toe aan lstPersonen. Bij het klikken op een option element in de lijst
    // moet de data van die persoon getoond worden in het formulier
    lstPersonen.addEventListener("change", toonPersoonDetails);
};

window.addEventListener("load", setup);