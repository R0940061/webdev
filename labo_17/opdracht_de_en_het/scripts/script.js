const zin = "Gisteren zat de jongen op de stoep en at de helft van de appel";

console.log("Originele zin:");
console.log(zin);
console.log("\nNa vervanging van 'de' door 'het':");

const zoekwoord = "de";
const vervangwoord = "het";
let resultaat = "";
let i = 0;

while (i < zin.length) {
    if (zin.slice(i, i + zoekwoord.length) === zoekwoord) {
        const voorIsGrens = (i === 0 || zin[i - 1] === " ");
        const achterIsGrens = (i + zoekwoord.length === zin.length || zin[i + zoekwoord.length] === " ");

        if (voorIsGrens && achterIsGrens) {
            resultaat += vervangwoord;
            i += zoekwoord.length;
        } else {
            resultaat += zin[i];
            i++;
        }
    } else {
        resultaat += zin[i];
        i++;
    }
}

console.log(resultaat);

const zinTest = "de man riep de";
console.log("\nExtra test: \"" + zinTest + "\"");
let resultaatTest = "";
let j = 0;
while (j < zinTest.length) {
    if (zinTest.slice(j, j + zoekwoord.length) === zoekwoord) {
        const voorIsGrens = (j === 0 || zinTest[j - 1] === " ");
        const achterIsGrens = (j + zoekwoord.length === zinTest.length || zinTest[j + zoekwoord.length] === " ");
        
        if (voorIsGrens && achterIsGrens) {
            resultaatTest += vervangwoord;
            j += zoekwoord.length;
        } else {
            resultaatTest += zinTest[j];
            j++;
        }
    } else {
        resultaatTest += zinTest[j];
        j++;
    }
}
console.log(resultaatTest);