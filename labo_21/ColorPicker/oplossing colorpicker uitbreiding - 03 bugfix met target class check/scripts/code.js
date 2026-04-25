const initialize = () => {
    let btnSave = document.getElementById("btnSave");
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
        // we moeten zowel op het input als het change event reageren,
        // zie http://stackoverflow.com/questions/18544890
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    update();

    /* de code hierboven is ongewijzigd t.o.v. de colorpicker oplossing */

    btnSave.addEventListener("click", saveSwatch);
};

const saveSwatch = () => {
    // voeg een nieuwe swatch component toe
    let swatchComponents = document.getElementById("swatchComponents");
    let swatch = buildSwatchComponent();
    swatchComponents.appendChild(swatch);
};

const configureSwatch = (swatch) => {
    let red = document.getElementById("sldRed").value;
    swatch.setAttribute("data-red", red);
	
    let green = document.getElementById("sldGreen").value;
    swatch.setAttribute("data-green", green);
	
    let blue = document.getElementById("sldBlue").value;
    swatch.setAttribute("data-blue", blue);
	
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";
};

const buildSwatchComponent = () => {
    // maak de twee element nodes
    let swatch = document.createElement("div");
    let btnDelete = document.createElement("input");

    // stel de swatch in
    swatch.className = "swatch";
    configureSwatch(swatch);
    swatch.addEventListener("click", setColorPickerFromSwatch);

    // stel de delete knop in
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("value", "X");
    btnDelete.addEventListener("click", deleteSwatch);

    // voeg de swatch en button toe aan de swatchcomponent
    swatch.appendChild(btnDelete);
    return swatch;
};

const setColorPickerFromSwatch = (event) => {
    // BUGFIX : we controleren of het event ontstond op het swatch element
    if (event.target.className=="swatch") {
        let swatch = event.target;
		
        let red = swatch.getAttribute("data-red");
        document.getElementById("sldRed").value = red;
		
        let green = swatch.getAttribute("data-green");
        document.getElementById("sldGreen").value = green;
		
        let blue = swatch.getAttribute("data-blue");
        document.getElementById("sldBlue").value = blue;
		
        // helaas triggeren de .value wijzigingen niet automatisch
        // een change event ds moeten we handmatig update oproepen
        update();
    } else {
        // deze callback werd niet opgeroepen door een klik op de swatch
        // maar door een klik op de button
    }
};

const deleteSwatch = (event) => {
    let swatchComponents = document.getElementById("swatchComponents");
    let button = event.target;
    let swatch = button.parentNode;
    swatchComponents.removeChild(swatch);
};

/* de code hieronder is ongewijzigd t.o.v. de colorpicker oplossing */

const update = () => {
    let red = document.getElementById("sldRed").value;
    document.getElementById("lblRed").innerHTML = red;

    let green = document.getElementById("sldGreen").value;
    document.getElementById("lblGreen").innerHTML = green;

    let blue = document.getElementById("sldBlue").value;
    document.getElementById("lblBlue").innerHTML = blue;

    let swatch = document.getElementById("swatch");
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";
};

window.addEventListener("load", initialize);