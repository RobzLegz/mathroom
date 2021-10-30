import { useRouter } from "next/dist/client/router";
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
    const router = useRouter();

    return (
        <div className={`levels__container__level levels__container__level__${Number(task.level) > 30 ? "purple" : Number(task.level) > 20 ? "red" : Number(task.level) > 10 ? "yellow" : "green"}`} onClick={() => router.push(`/levels/${task.level}`)}>
            <h4>{task.level}</h4>
        </div>
    )
}

export default LevelOption
