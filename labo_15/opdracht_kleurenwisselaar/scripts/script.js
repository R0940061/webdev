const setup = () => {
    let knoppen = document.getElementsByClassName("color-btn");
    
    for (let i = 0; i < knoppen.length; i++) {
        knoppen[i].addEventListener("click", wisselKleur);
    }
};

const wisselKleur = (event) => {
    event.target.classList.toggle("actief");
};


window.addEventListener("load", setup);