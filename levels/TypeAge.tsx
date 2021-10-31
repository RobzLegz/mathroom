import React, { useState } from 'react'

interface Props{
    description: string;
}

const TypeAge: React.FC<Props> = ({description}) => {
    const [selectedAge, setSelectedAge] = useState<number>(50);

    return (
        <div className="level__age level__container">
            <div className="level__container__tip">
                <p>{description}</p>
            </div>
            <div className="level__container__task">
                <div className="level__container__task__tools">
                    <input 
                        type="range" 
                        value={selectedAge}
                        onChange={(e) => setSelectedAge(Number(e.target.value))}
                        min="5"
                        max="100"
                    />
                </div>
                <div className="level__container__task__ilustration">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wSFbjLZV5FropOTZA0gnWgHaE7&pid=Api" alt="" />
                </div>
            </div>
        </div>
    )
}

export default TypeAge
