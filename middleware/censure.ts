let illegalWords = "fuck;nigger;nigga;nig;ble;bled;suka;smird;stinky;cunt;pidar;nigg;jobani;joban;rod;urod";

const censure = (word: string) => {
    let illegalWordArray = illegalWords.split(";")

    illegalWordArray.forEach((illegalWord) => {
        illegalWordArray.push(illegalWord.substr(0, word.length))
    })

    console.log(illegalWordArray)

    if(illegalWordArray.includes(word)){
        return null;
    }

    return "ok"
}

export default censure;