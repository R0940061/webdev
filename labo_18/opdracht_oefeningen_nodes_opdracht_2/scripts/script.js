const setup = () => {
    // Itereer door elk li-element en wijzig de class naar "listitem"
    const lijstItems = document.querySelectorAll("li");
    for (let i = 0; i < lijstItems.length; i++) {
        lijstItems[i].className = "listitem";
    }

    // Maak een nieuw img-element aan en geef een waarde aan het src-attribuut
    const img = document.createElement("img");
    img.setAttribute("src", "https://via.placeholder.com/100");
    img.setAttribute("alt", "Foto van mezelf");

    // Plaats het img-element op het einde van de body
    document.body.appendChild(img);
};

window.addEventListener("load", setup);