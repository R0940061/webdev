const setup = () => {
    document.getElementById("btnVoegToe").addEventListener("click", () => {
        // Maak een nieuw p-element aan
        const nieuwP = document.createElement("p");
        nieuwP.textContent = "Dit is een nieuw p-element.";

        // Voeg het toe aan het div-element
        document.getElementById("myDIV").appendChild(nieuwP);
    });
};

window.addEventListener("load", setup);