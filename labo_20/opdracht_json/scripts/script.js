const speelMetJSON = () => {
    let student1 = {
        voornaam: "Jan",
        familienaam: "Janssens",
        geboorteDatum: new Date("1993-12-31"), 
        adres: {
            straat: "Kerkstraat 13",
            postcode: "8500",
            gemeente: "Kortrijk"
        },
        isIngeschreven: true,
        namenVanExen: ["Sofie", "Berta", "Philip", "Albertoooo"],
        aantalAutos: 2
    };

    // 2. Bouw de JSON string en zet op console [cite: 825]
    let jsonString = JSON.stringify(student1);
    console.log("De gegenereerde JSON string is:");
    console.log(jsonString);

    // --- DEEL 2 ---
    // 1. Maak een object aan de hand van de JSON string [cite: 826, 827]
    // (In de praktijk kopieer je de tekst, maar we gebruiken hier de variabele voor het gemak)
    let geparsedObject = JSON.parse(jsonString);

    // 2. Zet een property op de console [cite: 828]
    console.log("De voornaam uit het geparsede object is: " + geparsedObject.voornaam);

    // Extra controle (voor de theorievragen):
    console.log("Let op het type van de datum: " + typeof geparsedObject.geboorteDatum);
    // Dit geeft "string" terug, niet "object"!
};

speelMetJSON();



