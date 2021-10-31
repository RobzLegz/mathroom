import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import TypeAge from '../levels/TypeAge';

interface Task{
    level: string;
    type: string;
    text: string;
    result: string;
    image: string;
    units: string;
    info: string;
}

const DisplayLevel: React.FC = () => {
    const [foundTask, setFoundTask] = useState<boolean>(false);
    const [activeTask, setActiveTask] = useState<null | Task>(null);

    const router = useRouter();

    const {level} = router.query;

    useEffect(() => {
        if(!foundTask){
            const taskOptions = tasks.filter((task) => task.level === String(level));

            if(taskOptions){
                setActiveTask(taskOptions[Math.floor(Math.random() * (taskOptions.length - 1))])
                setFoundTask(true);
            }
        }
    }, [activeTask, tasks, foundTask, level]);

    if(!activeTask || !activeTask.type){
        return null;
    }

    if(activeTask.type === "age"){
        return <TypeAge description={activeTask.info} />
    }

    return null;
}

export default DisplayLevel
