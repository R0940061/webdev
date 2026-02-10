const setup = () => {
// deze code wordt pas uitgevoerd
// als de pagina volledig is ingeladen


    let familyMembers = ["Jan", "An", "Bert", "Marie", "Luc"];


    console.log("Number of members:", familyMembers.length);

    console.log("First element:", familyMembers[0]);
    console.log("Third element:", familyMembers[2]);
    console.log("Fifth element:", familyMembers[4]);


    function voegNaamToe(targetArray) {
        let newName = prompt("Enter an extra name:");
        if (newName) {
            targetArray.push(newName);
        }
    }


    voegNaamToe(familyMembers);
    console.log("Updated array:", familyMembers);


    let arrayString = familyMembers.join(", ");
    console.log("Array as string:", arrayString);



}
window.addEventListener("load", setup);