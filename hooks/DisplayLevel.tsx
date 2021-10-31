import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import TypeAge from '../levels/TypeAge';

interface Porps{
    level: string;
}

interface Task{
    level: string;
    type: string;
    text: string;
    result: string;
    image: string;
    units: string;
    info: string;
}

const DisplayLevel: React.FC<Porps> = ({level}) => {
    const [foundTask, setFoundTask] = useState<boolean>(false);
    const [activeTask, setActiveTask] = useState<null | Task>(null);

    useEffect(() => {
        if(!foundTask){
            const taskOptions = tasks.filter((task) => task.level === level);

            if(taskOptions){
                setActiveTask(taskOptions[Math.floor(Math.random() * (taskOptions.length - 1))])
                setFoundTask(true);
            }
        }
    }, [activeTask, tasks, foundTask]);
    console.log(activeTask)

    if(!activeTask || !activeTask.type){
        return null;
    }

    if(activeTask.type === "age"){
        return <TypeAge description={activeTask.info} />
    }

    return null;
}

export default DisplayLevel
