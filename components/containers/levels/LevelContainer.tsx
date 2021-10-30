import React, { useState } from "react"
import tasks from "../../../data/tasks";
import LevelOption from "./LevelOption";

function LevelContainer() {
    const [pushedLevels] = useState<string[]>([]);

    return (
        <div className="levels__container">
            {tasks
                .sort((a, b) => {return Number(a.level) - Number(b.level)})
                .map((task, i) => {
                if(!pushedLevels.includes(task.level)){
                    pushedLevels.push(task.level);

                    return(
                        <LevelOption key={i} task={task} />
                    )
                }

                return null;
            })}
        </div>
    )
}

export default LevelContainer
