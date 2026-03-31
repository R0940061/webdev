const berekenDagenOpWereldbol = () => {

    let vandaag = new Date();
    let geboorteDatum = new Date("2003-10-11");

    let verschilInMilliseconden = vandaag.getTime() - geboorteDatum.getTime();

    let verschilInDagen = Math.floor(verschilInMilliseconden / (1000 * 3600 * 24));

    console.log("Ik loop al " + verschilInDagen + " dagen rond op deze wereldbol!");
};

berekenDagenOpWereldbol();