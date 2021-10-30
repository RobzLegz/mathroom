import React from "react"

interface Task{
    level: string;
    type: string;
    text: string;
    result: string;
    image: string;
    units: string;
    info: string;
}

interface Props{
    task: Task;
}

const LevelOption: React.FC<Props> = ({task}) => {
    return (
        <div>
            {task.level}
        </div>
    )
}

export default LevelOption
