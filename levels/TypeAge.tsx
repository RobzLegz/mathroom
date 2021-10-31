import React, { useState } from 'react'

interface Props{
    description: string;
}

const TypeAge: React.FC<Props> = ({description}) => {
    const [selectedAge, setSelectedAge] = useState<number>(50);
    console.log(selectedAge)

    return (
        <div className="level__age level__container">
            <div className="level__container__tip">
                <p>{description}</p>
            </div>
            <input 
                type="range" 
                value={selectedAge}
                onChange={(e) => setSelectedAge(Number(e.target.value))}
                min="5"
                max="100"
            />
        </div>
    )
}

export default TypeAge
