const setup = () => {
    let btn = document.getElementById("btnWijzig");

    btn.addEventListener("click", wijzig);
}

const wijzig = () => {

    let pElement = document.getElementById("txtOutput");
    pElement.innerHTML = "Welkom!";
}

window.addEventListener("load", setup);