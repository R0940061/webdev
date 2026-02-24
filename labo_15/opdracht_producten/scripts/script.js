const setup = () => {
    let knop = document.getElementById("btnHerbereken");
    knop.addEventListener("click", herbereken);
};

const herbereken = () => {
    let prijzen = document.getElementsByClassName("prijs");
    let aantallen = document.getElementsByClassName("aantal");
    let btws = document.getElementsByClassName("btw");
    let subtotalen = document.getElementsByClassName("subtotaal");

    let totaal = 0;
    for (let i = 0; i < prijzen.length; i++) {

        let prijs = parseFloat(prijzen[i].innerHTML);
        let aantal = parseFloat(aantallen[i].value);
        let btw = parseFloat(btws[i].innerHTML);

        let subtotaal = prijs * aantal * (1 + (btw / 100));

        subtotalen[i].innerHTML = subtotaal.toFixed(2) + " Eur";

        totaal += subtotaal;
    }

    document.getElementById("totaalVeld").innerHTML = totaal.toFixed(2) + " Eur";
};

window.addEventListener("load", setup);