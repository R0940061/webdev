const setup = () => {
    
    
}


const postcode = document.getElementById("postcode");
postcode.addEventListener("input", () => {
    const val = parseInt(postcode.value);
    if (val < 1000 || val > 9992) {
        postcode.setCustomValidity("Voer een geldige Belgische postcode in (1000–9992).");
    } else {
        postcode.setCustomValidity("");
    }
});
window.addEventListener("load", setup);