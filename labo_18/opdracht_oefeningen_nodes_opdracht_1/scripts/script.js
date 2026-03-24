const setup = () => {
    // Gebruik querySelectorAll om het p-element te vinden en wijzig de tekst
    const paragrafen = document.querySelectorAll("p");
    paragrafen[0].textContent = "Goed gedaan!";
};

window.addEventListener("load", setup);