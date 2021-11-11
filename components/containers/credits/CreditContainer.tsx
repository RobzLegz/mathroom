import React from 'react'

const credits = [
    {
        image: "/levels/cash.png",
        author: "Dimitry Miroliubov"
    },
    {
        image: "/levels/calendar.png",
        author: "DinosoftLabs"
    },
    {
        image: "/png/skater2.png",
        author: "Smashicons"
    },
    {
        image: "/levels/cyclist.png",
        author: "monkik"
    },
    {
        image: "/levels/frog.png",
        author: "All_Dee"
    },
    {
        image: "/levels/pay.png",
        author: "Freepik"
    },
    {
        image: "/png/coin.png",
        author: "Freepik"
    },
    {
        image: "/levels/pay.png",
        author: "Freepik"
    },
    {
        image: "/png/skater1.png",
        author: "Freepik"
    },
    {
        image: "/levels/car1.png",
        author: "Freepik"
    },
    {
        image: "/levels/car2.png",
        author: "Freepik"
    },
    {
        image: "/levels/car3.png",
        author: "Freepik"
    },
    {
        image: "/levels/fly.png",
        author: "Freepik"
    },
    {
        image: "/levels/cookie.png",
        author: "Freepik"
    },
    {
        image: "/levels/dash.png",
        author: "Freepik"
    },
    {
        image: "/png/motorbike.png",
        author: "Freepik"
    },
    {
        image: "/png/coin.png",
        author: "Freepik"
    },
    {
        image: "/svg/happyFace.svg",
        author: "Vectors Market"
    },
    {
        image: "/svg/angryFace.svg",
        author: "Vectors Market"
    },
    {
        image: "/svg/confusedFace.svg",
        author: "Vectors Market"
    },
    {
        image: "/png/car.png",
        author: "Vectors Market"
    }
];

function CreditContainer() {
    return (
        <div className="credits__container">
            {
                credits.map((credit, i: number) => {
                    return(
                        <div className="credits__container__credit" key={i}>
                            <img src={credit.image} alt={`Icon made by ${credit.author} from flaticon`} />
                            <h4>Icon made by {credit.author} from <a href="https://flaticon.com">www.flaticon.com</a></h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CreditContainer
