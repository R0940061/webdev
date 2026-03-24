const setup = () => {
    // Zoek de paragraaf met id="abc" op
    const paragraaf = document.getElementById("abc");

    // Breakpoint hier: bekijk in de debugger de boomstructuur via parentNode/childNodes
    console.log("Paragraaf element:", paragraaf);
    console.log("nodeName:", paragraaf.nodeName);
    console.log("nodeType:", paragraaf.nodeType);

    // Bekijk de childNodes (inclusief text nodes)
    console.log("Aantal childNodes:", paragraaf.childNodes.length);
    for (let i = 0; i < paragraaf.childNodes.length; i++) {
        const node = paragraaf.childNodes[i];
        console.log(`childNode[${i}]: nodeName="${node.nodeName}", nodeType=${node.nodeType}, nodeValue="${node.nodeValue}"`);
    }

    // Bekijk enkel de element children
    console.log("Aantal children (enkel elementen):", paragraaf.children.length);
};

window.addEventListener("load", setup);