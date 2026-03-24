const setup = () => {
    let sliders = document.getElementsByClassName("slider");

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }

    document.getElementById("btnSave").addEventListener("click", saveColor);

    // Event listener op ancestor niveau: klik op een bewaarde swatch herstelt de kleur
    document.getElementById("savedSwatches").addEventListener("click", (event) => {
        const swatch = event.target.closest(".savedSwatch");
        if (!swatch) return;

        // Klik op delete knop: verwijder de swatch
        if (event.target.classList.contains("deleteBtn")) {
            swatch.parentNode.removeChild(swatch);
            return;
        }

        // Klik op de swatch zelf: herstel de kleur in de colorpicker
        const r = swatch.getAttribute("data-r");
        const g = swatch.getAttribute("data-g");
        const b = swatch.getAttribute("data-b");

        document.getElementById("sldRed").value = r;
        document.getElementById("sldGreen").value = g;
        document.getElementById("sldBlue").value = b;

        update();
    });

    update();
};

const update = () => {
    let red = document.getElementById("sldRed").value;
    let green = document.getElementById("sldGreen").value;
    let blue = document.getElementById("sldBlue").value;

    document.getElementById("lblRed").innerHTML = red;
    document.getElementById("lblGreen").innerHTML = green;
    document.getElementById("lblBlue").innerHTML = blue;

    let swatch = document.getElementById("swatch");
    swatch.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
};

const saveColor = () => {
    const red = document.getElementById("sldRed").value;
    const green = document.getElementById("sldGreen").value;
    const blue = document.getElementById("sldBlue").value;
    const color = "rgb(" + red + "," + green + "," + blue + ")";

    // Maak de swatch container aan
    const savedSwatch = document.createElement("div");
    savedSwatch.classList.add("savedSwatch");
    savedSwatch.setAttribute("data-r", red);
    savedSwatch.setAttribute("data-g", green);
    savedSwatch.setAttribute("data-b", blue);
    savedSwatch.style.backgroundColor = color;

    // Maak de delete knop aan
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "X";

    savedSwatch.appendChild(deleteBtn);

    document.getElementById("savedSwatches").appendChild(savedSwatch);
};

window.addEventListener("load", setup);