import React, { useState } from 'react'

interface Props{
    description: string;
}

const TypeAge: React.FC<Props> = ({description}) => {
    const [selectedAge, setSelectedAge] = useState<number>(5);
    const [correctAnswer] = useState<number>(Math.floor((Math.random() * 64) + 5));
    const [needHelp, setNeedHelp] = useState<boolean>(false);

    return (
        <div className="level__age level__container">
            {needHelp && (
                <div className="level__container__tip">
                    <p>To get Your current age, subtract given year from current year ({new Date().getFullYear()})</p>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>How old are You now if You were born in {new Date().getFullYear() - correctAnswer}?</strong>
                <img src="/svg/question.svg" alt="question mark inside circle" onClick={() => setNeedHelp(!needHelp)} />
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="inputContainer">
                        <input 
                            type="range" 
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(Number(e.target.value))}
                            min="5"
                            max="100"
                        />
                        <strong>{selectedAge}</strong>
                    </div>
                    <div className="level__container__options__tools__instruction">
                        <small>Slide from left to right to change value</small>
                    </div>
                    <button className="level__container__options__tools__submit">Submit</button>
                </div>
                <div className="level__container__options__ilustration">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wSFbjLZV5FropOTZA0gnWgHaE7&pid=Api" alt="" />
                </div>
            </div>
        </div>
    )
}

export default TypeAge
