import React from 'react'

interface Props{
    color: string;
}

const GameBackground: React.FC<Props> = ({color}) => {
    return (
        <div className="backgroundLines">
            <div className={`line line__${color} line1`}></div>
            <div className={`line line__${color} line2`}></div>
            <div className={`line line__${color} line3`}></div>
            <div className={`line line__${color} line4`}></div>
            <div className={`line line__${color} line5`}></div>
            <div className={`line line__${color} line6`}></div>
            <div className={`line line__${color} line7`}></div>
            <div className={`line line__${color} line8`}></div>
            <div className={`line line__${color} line9`}></div>
        </div>
    )
}

export default GameBackground
