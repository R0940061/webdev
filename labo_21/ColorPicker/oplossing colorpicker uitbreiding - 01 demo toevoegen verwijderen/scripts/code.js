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
    let swatchComponents=document.getElementById("swatchComponents");
    let swatch=buildSwatchComponent();
    swatchComponents.appendChild(swatch);
};


let i=0; // simpel tellertje als globale variabele, enkel voor de demo

const buildSwatchComponent = () => {
    // maak de twee element nodes
    let swatch=document.createElement("div");
    let btnDelete=document.createElement("input");

    // stel de swatch in
    swatch.className="swatch";

    // stel de delete knop in
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("value", "X");
    btnDelete.addEventListener("click", deleteSwatch);

    // geef elke swatch een nummer, enkel voor de demo
    swatch.textContent=i;
    i++;

    // voeg de swatch en button toe aan de swatchcomponent
    swatch.appendChild(btnDelete);
    return swatch;
};

const deleteSwatch = (event) => {
    let swatchComponents=document.getElementById("swatchComponents");
    let button=event.target;
    let swatch=button.parentNode;
    swatchComponents.removeChild(swatch);
};

/* de code hieronder is ongewijzigd t.o.v. de colorpicker oplossing */

const update = () => {
	let red=document.getElementById("sldRed").value;
	document.getElementById("lblRed").innerHTML=red;

	let green=document.getElementById("sldGreen").value;
	document.getElementById("lblGreen").innerHTML=green;

	let blue=document.getElementById("sldBlue").value;
	document.getElementById("lblBlue").innerHTML=blue;

	let swatch=document.getElementById("swatch");
	swatch.style.background="rgb("+red+","+green+","+blue+")";
};

window.addEventListener("load", initialize);