const woord = "onoorbaar";

console.log(`Trigrams van het woord "${woord}":`);

for (let i = 0; i <= woord.length - 3; i++) {
    const trigram = woord.slice(i, i + 3);
    console.log(trigram);
}