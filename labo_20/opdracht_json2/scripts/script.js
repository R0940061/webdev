
// 1. Plak hier de letterlijke tekst die je uit de console van programma 1 hebt gekopieerd
let gekopieerdeJsonTekst = '{"voornaam":"Jan","familienaam":"Janssens","geboorteDatum":"1993-12-31T00:00:00.000Z","adres":{"straat":"Kerkstraat 13","postcode":"8500","gemeente":"Kortrijk"},"isIngeschreven":true,"namenVanExen":["Sofie","Berta","Philip","Albertoooo"],"aantalAutos":2}';

// Maak een object aan de hand van deze JSON String
let nieuwStudentObject = JSON.parse(gekopieerdeJsonTekst);

// 2. Zet een property van dit object op de console
console.log("De voornaam van de student is: " + nieuwStudentObject.voornaam);
console.log("Gemeente: " + nieuwStudentObject.adres.gemeente);