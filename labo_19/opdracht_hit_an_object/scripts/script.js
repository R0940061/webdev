// Stap 3 uit de PDF: Globale variabelen bundelen in één object
let global = {
    IMAGE_COUNT: 5,           // Aantal figuren (0 t/m 4)
    IMAGE_SIZE: 48,           // Grootte van de figuur in pixels
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",
    MOVE_DELAY: 1000,         // 1000 ms = 1 seconde
    score: 0,                 // Huidige score
    timeoutId: 0              // Om de timer te kunnen stoppen
};

const setup = () => {
    // Koppel de startknop
    let btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", startGame);

    // Koppel de klik op de afbeelding
    let target = document.getElementById("target");
    target.addEventListener("click", hitTarget);
};

const startGame = () => {
    // Reset de score naar 0 en update de HTML
    global.score = 0;
    document.getElementById("scoreDisplay").innerText = global.score;

    // Maak het prentje zichtbaar
    let target = document.getElementById("target");
    target.style.display = "block";

    // Zorg dat er geen oude timers meer lopen (voorkomt versnelling als je vaak op start klikt)
    clearInterval(global.timeoutId);

    // Verplaats direct de eerste keer, en start dan de interval
    moveAndChangeTarget();
    global.timeoutId = setInterval(moveAndChangeTarget, global.MOVE_DELAY);
};

const hitTarget = () => {
    let target = document.getElementById("target");

    // Controleer of de bom is aangeklikt (plaatje 0.png)
    if (target.src.includes("0.png")) {
        // Stop de timer en toon game over!
        clearInterval(global.timeoutId);
        alert("GAME OVER");
    } else {
        // Het is een zoetigheid: scoor een punt!
        global.score++;
        document.getElementById("scoreDisplay").innerText = global.score;

        // Zodra je klikt, verplaatsen we het prentje direct en resetten we de timer.
        // Dit zorgt voor soepele gameplay (anders springt hij misschien nét weg als je wilt klikken).
        clearInterval(global.timeoutId);
        moveAndChangeTarget();
        global.timeoutId = setInterval(moveAndChangeTarget, global.MOVE_DELAY);
    }
};

const moveAndChangeTarget = () => {
    let target = document.getElementById("target");
    let playField = document.getElementById("playField");

    // 1. Kies een willekeurige nieuwe afbeelding (0 t/m 4)
    let randomImgNumber = Math.floor(Math.random() * global.IMAGE_COUNT);
    target.src = global.IMAGE_PATH_PREFIX + randomImgNumber + global.IMAGE_PATH_SUFFIX;

    // 2. Bereken de maximale positie (grootte speelveld - grootte afbeelding)
    let maxLeft = playField.clientWidth - global.IMAGE_SIZE;
    let maxTop = playField.clientHeight - global.IMAGE_SIZE;

    // 3. Genereer een willekeurige X en Y coördinaat
    let left = Math.floor(Math.random() * maxLeft);
    let top = Math.floor(Math.random() * maxTop);

    // 4. Pas de positie toe in de CSS
    target.style.left = left + "px";
    target.style.top = top + "px";
};

window.addEventListener("load", setup);