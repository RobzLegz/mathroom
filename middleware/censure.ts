let illegalWords = "fuck;nigger;nigga;nig;ble;bled;suka;smird;stinky;cunt;pidar;nigg;jobani;joban;rod;urod;idiot";

const censure = (word: string) => {
    let illegalWordArray = illegalWords.split(";")

    if(word.length > 3){
        illegalWordArray.forEach((illegalWord) => {
            illegalWordArray.push(illegalWord.substr(0, word.length))
        });
    }

    if(illegalWordArray.includes(word)){
        return null;
    }

    return "ok"
}

export default censure;