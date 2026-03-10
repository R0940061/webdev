// Opdracht 2.10: Formvalidatie
// Valideer een registratieformulier met voornaam, familienaam, geboortedatum, email en aantal kinderen.

const setup = () => {

    const isGetal = (tekst) => {
        return !isNaN(tekst);
    };

// Hulpfunctie: stel een veld in als geldig of ongeldig
    const setVeldStatus = (id, foutmelding) => {
        const input = document.getElementById(id);
        const errorSpan = document.getElementById("error-" + id);

        if (foutmelding) {
            input.classList.add("invalid");
            errorSpan.textContent = foutmelding;
        } else {
            input.classList.remove("invalid");
            errorSpan.textContent = "";
        }

        return foutmelding === null; // true = geldig
    };

// Valideer voornaam
    const valideerVoornaam = () => {
        const waarde = document.getElementById("voornaam").value.trim();
        if (waarde.length > 30) {
            return setVeldStatus("voornaam", "max. 30 karakters");
        }
        return setVeldStatus("voornaam", null);
    };

// Valideer familienaam
    const valideerFamilienaam = () => {
        const waarde = document.getElementById("familienaam").value.trim();
        if (waarde.length === 0) {
            return setVeldStatus("familienaam", "verplicht veld");
        }
        if (waarde.length > 50) {
            return setVeldStatus("familienaam", "max 50 karakters");
        }
        return setVeldStatus("familienaam", null);
    };

// Valideer geboortedatum (formaat: jjjj-mm-dd)
    const valideerGeboortedatum = () => {
        const waarde = document.getElementById("geboortedatum").value.trim();

        if (waarde.length === 0) {
            return setVeldStatus("geboortedatum", "verplicht veld");
        }

        // Controleer of het formaat klopt: jjjj-mm-dd
        // Totale lengte moet 10 zijn (4 + 1 + 2 + 1 + 2)
        if (waarde.length !== 10) {
            return setVeldStatus("geboortedatum", "formaat is niet jjjj-mm-dd");
        }

        // Controleer de '-' streepjes op posities 4 en 7
        if (waarde[4] !== "-" || waarde[7] !== "-") {
            return setVeldStatus("geboortedatum", "formaat is niet jjjj-mm-dd");
        }

        const jaar = waarde.slice(0, 4);
        const maand = waarde.slice(5, 7);
        const dag = waarde.slice(8, 10);

        // Jaar moet 4 karakters lang zijn en een getal zijn
        if (jaar.length !== 4 || !isGetal(jaar)) {
            return setVeldStatus("geboortedatum", "formaat is niet jjjj-mm-dd");
        }

        // Maand en dag moeten 2 karakters lang zijn en positieve getallen zijn
        if (maand.length !== 2 || !isGetal(maand) || parseInt(maand) <= 0) {
            return setVeldStatus("geboortedatum", "formaat is niet jjjj-mm-dd");
        }

        if (dag.length !== 2 || !isGetal(dag) || parseInt(dag) <= 0) {
            return setVeldStatus("geboortedatum", "formaat is niet jjjj-mm-dd");
        }

        return setVeldStatus("geboortedatum", null);
    };

// Valideer email
    const valideerEmail = () => {
        const waarde = document.getElementById("email").value.trim();

        if (waarde.length === 0) {
            return setVeldStatus("email", "verplicht veld");
        }

        // Tel het aantal @-tekens
        let aantalAt = 0;
        let atPositie = -1;
        for (let i = 0; i < waarde.length; i++) {
            if (waarde[i] === "@") {
                aantalAt++;
                atPositie = i;
            }
        }

        if (aantalAt !== 1) {
            return setVeldStatus("email", "geen geldig email adres");
        }

        // Minimum 1 karakter voor en na het @-teken
        const voorAt = waarde.slice(0, atPositie);
        const naAt = waarde.slice(atPositie + 1);

        if (voorAt.length < 1 || naAt.length < 1) {
            return setVeldStatus("email", "geen geldig email adres");
        }

        return setVeldStatus("email", null);
    };

// Valideer aantal kinderen
    const valideerAantalKinderen = () => {
        const waarde = document.getElementById("aantalKinderen").value.trim();

        if (waarde.length === 0 || !isGetal(waarde) || parseFloat(waarde) < 0 || !Number.isInteger(parseFloat(waarde))) {
            return setVeldStatus("aantalKinderen", "is geen positief getal");
        }

        const getal = parseInt(waarde);

        if (getal < 0) {
            return setVeldStatus("aantalKinderen", "is geen positief getal");
        }

        if (getal >= 99) {
            return setVeldStatus("aantalKinderen", "is te vruchtbaar");
        }

        return setVeldStatus("aantalKinderen", null);
    };

// Klik op Valideer knop
    document.getElementById("btnValideer").addEventListener("click", () => {
        const v1 = valideerVoornaam();
        const v2 = valideerFamilienaam();
        const v3 = valideerGeboortedatum();
        const v4 = valideerEmail();
        const v5 = valideerAantalKinderen();

        if (v1 && v2 && v3 && v4 && v5) {
            alert("proficiat!");
        }
    });

};

window.addEventListener("load", setup);