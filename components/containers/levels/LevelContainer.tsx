import { useRouter } from "next/dist/client/router";
import React from "react"
import tasks from "../../../data/tasks";
import LevelOption from "./LevelOption";

function LevelContainer() {
    const router = useRouter();

    return (
        <div className="levels__container">
            <header className="levels__container__header">
                <button className="levels__container__header__back" onClick={() => router.push("/menu")}>Back</button>
                <div className="levels__container__header__title">
                    <h2>Levels</h2>
                </div>
                <button className="roomPage__container__header__new" onClick={() => router.push("/community/levels/new")}>Create new</button>
            </header>
            <div className="levels__container__tasks">
                <div className="levels__container__tasks__container">
                    {
                        tasks
                            .map((task, i) => {

                                let level = i + 1;

                                let pushTask = {
                                    type: task.type,
                                    level: String(level)
                                }

                                return <LevelOption key={i} task={pushTask} />;
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default LevelContainer
