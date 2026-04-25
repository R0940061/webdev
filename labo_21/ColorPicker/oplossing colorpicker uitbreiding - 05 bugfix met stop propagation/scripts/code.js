const COLOR_PICKER_SETTINGS_KEY = "VIVES.be.colorPicker.settings";
const COLOR_PICKER_SWATCHES_KEY = "VIVES.be.colorPicker.swatches";

const initialize = () =>{
    let btnSave = document.getElementById("btnSave");
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
        // we moeten zowel op het input als het change event reageren,
        // zie http://stackoverflow.com/questions/18544890
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    restoreSliderSettings();
    restoreSwatches();
    update();

    /* de code hierboven is ongewijzigd t.o.v. de colorpicker oplossing */

    btnSave.addEventListener("click", saveSwatch);
};

const saveSwatch = () =>{
    // voeg een nieuwe swatch component toe
    let swatchComponents = document.getElementById("swatchComponents");
    let swatch = buildSwatchComponent();
    swatchComponents.appendChild(swatch);
    storeSwatches();
};

const configureSwatch = (swatch, color) =>{
    let red = color.red;
    swatch.setAttribute("data-red", red);

    let green = color.green;
    swatch.setAttribute("data-green", green);

    let blue = color.blue;
    swatch.setAttribute("data-blue", blue);

    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";
};

const buildSwatchComponent = (color = getCurrentColor()) =>{
    // maak de twee element nodes
    let swatch = document.createElement("div");
    let btnDelete = document.createElement("input");

    // stel de swatch in
    swatch.className = "swatch";
    configureSwatch(swatch, color);
    swatch.addEventListener("click", setColorPickerFromSwatch);

    // stel de delete knop in
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("value", "X");
    btnDelete.addEventListener("click", deleteSwatch);

    // voeg de swatch en button toe aan de swatchcomponent
    swatch.appendChild(btnDelete);
    return swatch;
};

const setColorPickerFromSwatch = (event) =>{
    let swatch = event.currentTarget;
	
    let red = swatch.getAttribute("data-red");
    document.getElementById("sldRed").value = red;
    
	let green = swatch.getAttribute("data-green");
    document.getElementById("sldGreen").value = green;
    
	let blue = swatch.getAttribute("data-blue");
    document.getElementById("sldBlue").value = blue;
	
    // helaas triggeren de .value wijzigingen niet automatisch
    // een change event ds moeten we handmatig update oproepen
    update();
};

const deleteSwatch = (event) =>{
    let swatchComponents = document.getElementById("swatchComponents");
    let button = event.target;
    let swatch = button.parentNode;
    swatchComponents.removeChild(swatch);
    storeSwatches();
    // BUGFIX zorg ervoor dat dit event niet naar de ancestors opborrelt
    event.stopPropagation();
};

/* de code hieronder is ongewijzigd t.o.v. de colorpicker oplossing */

const update = () =>{
    let red = document.getElementById("sldRed").value;
    document.getElementById("lblRed").innerHTML = red;

    let green = document.getElementById("sldGreen").value;
    document.getElementById("lblGreen").innerHTML = green;

    let blue = document.getElementById("sldBlue").value;
    document.getElementById("lblBlue").innerHTML = blue;

    let swatch = document.getElementById("swatch");
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";
    storeSliderSettings();
};

const getCurrentColor = () =>{
    return {
        red: document.getElementById("sldRed").value,
        green: document.getElementById("sldGreen").value,
        blue: document.getElementById("sldBlue").value
    };
};

const canUseStorage = () =>{
    return typeof(Storage) !== "undefined";
};

const storeSliderSettings = () =>{
    if (!canUseStorage()) {
        return;
    }
    localStorage.setItem(COLOR_PICKER_SETTINGS_KEY, JSON.stringify(getCurrentColor()));
};

const restoreSliderSettings = () =>{
    if (!canUseStorage()) {
        return;
    }

    let settingsJson = localStorage.getItem(COLOR_PICKER_SETTINGS_KEY);
    if (settingsJson === null) {
        return;
    }

    let settings = JSON.parse(settingsJson);
    document.getElementById("sldRed").value = settings.red;
    document.getElementById("sldGreen").value = settings.green;
    document.getElementById("sldBlue").value = settings.blue;
};

const getSwatchesFromDom = () =>{
    let swatches = document.querySelectorAll("#swatchComponents .swatch");
    let colors = [];
    for (let i = 0; i < swatches.length; i++) {
        colors.push({
            red: swatches[i].getAttribute("data-red"),
            green: swatches[i].getAttribute("data-green"),
            blue: swatches[i].getAttribute("data-blue")
        });
    }
    return colors;
};

const storeSwatches = () =>{
    if (!canUseStorage()) {
        return;
    }
    localStorage.setItem(COLOR_PICKER_SWATCHES_KEY, JSON.stringify(getSwatchesFromDom()));
};

const restoreSwatches = () =>{
    if (!canUseStorage()) {
        return;
    }

    let swatchesJson = localStorage.getItem(COLOR_PICKER_SWATCHES_KEY);
    if (swatchesJson === null) {
        return;
    }

    let swatches = JSON.parse(swatchesJson);
    let swatchComponents = document.getElementById("swatchComponents");

    for (let i = 0; i < swatches.length; i++) {
        swatchComponents.appendChild(buildSwatchComponent(swatches[i]));
    }
};

window.addEventListener("load", initialize);
