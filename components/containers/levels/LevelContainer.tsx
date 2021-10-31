import React, { useState } from "react"
import tasks from "../../../data/tasks";
import LevelOption from "./LevelOption";

function LevelContainer() {
    const [pushedLevels] = useState<number[]>([]);

    return (
        <div className="levels__container">
            {
                tasks
                    .map((task, i) => {
                    if(!pushedLevels.includes(i)){
                        pushedLevels.push(i);

                        let level = i + 1;

                        let pushTask = {
                            type: task.type,
                            level: String(level)
                        }

                        return(
                            <LevelOption key={i} task={pushTask} />
                        )
                    }
                return null;
            })}
        </div>
    )
}

export default LevelContainer
