// Opdracht 2.7: Gemeenten
// Vraag de gebruiker gemeenten op via prompt, sorteer alfabetisch en toon in een keuzelijst.

const setup = () => {

    document.getElementById("btnInvoer").addEventListener("click", () => {
        const gemeenten = [];

        while (true) {
            const invoer = prompt("Geef een gemeente in");

            if (invoer === null || invoer.trim().toLowerCase() === "stop") {
                break;
            }

            const gemeente = invoer.trim();
            if (gemeente !== "") {
                gemeenten.push(gemeente);
            }
        }

        const resultaatDiv = document.getElementById("resultaat");

        if (gemeenten.length === 0) {
            resultaatDiv.innerHTML = "<p>Geen gemeenten ingegeven.</p>";
            return;
        }

        const compare = (a, b) => a.localeCompare(b);
        gemeenten.sort(compare);

        resultaatDiv.innerHTML = "<h2>Gemeenten (alfabetisch):</h2>";
        const select = document.createElement("select");
        select.size = gemeenten.length > 6 ? 6 : gemeenten.length;

        gemeenten.forEach(gemeente => {
            const option = document.createElement("option");
            option.text = gemeente;
            option.value = gemeente;
            select.appendChild(option);
        });

        resultaatDiv.appendChild(select);
    });

};

window.addEventListener("load", setup);