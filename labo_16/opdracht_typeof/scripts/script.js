const setup = () => {
// deze code wordt pas uitgevoerd
// als de pagina volledig is ingeladen
}

let leeftijd = 34;
let intrest = 0.12;
let isGevaarlijk = true;
let vandaag = new Date();
const print = (message) => { console.log(message); };

const vars = [
    { name: "leeftijd",     val: leeftijd },
    { name: "intrest",      val: intrest },
    { name: "isGevaarlijk", val: isGevaarlijk },
    { name: "vandaag",      val: vandaag },
    { name: "print",        val: print }
];

const tbl = document.getElementById("tbl");
vars.forEach(v => {
    const t = typeof v.val;
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + v.name + "</td><td>" + String(v.val).substring(0,40) + "</td><td>\"" + t + "\"</td>";
    tbl.appendChild(row);
    console.log("typeof " + v.name + " = \"" + t + "\"");
});
window.addEventListener("load", setup);