const maakMetSpaties = (inputText) => {
    let result = "";
    for (let i = 0; i < inputText.length; i++) {
        const kar = inputText[i];
        if (kar === " ") {
            result += " ";
        } else {
            if (result.length > 0 && result[result.length - 1] !== " ") {
                result += " ";
            }
            result += kar;
        }
    }
    return result.trimEnd();
};

function toon() {
    const tekst = document.getElementById("invoer").value;
    const resultaat = maakMetSpaties(tekst);
    console.log(resultaat);
    document.getElementById("output").textContent = resultaat;
}