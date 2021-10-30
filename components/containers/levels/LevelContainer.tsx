import React, { useEffect, useState } from "react"
import tasks from "../../../data/tasks";
import LevelOption from "./LevelOption";

function LevelContainer() {
    const [pushedLevels] = useState<string[]>([]);

    return (
        <div>
            {tasks.map((task, i) => {
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
