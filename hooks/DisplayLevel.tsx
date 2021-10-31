import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import MonthAmount from '../levels/MonthAmount';
import TimeDifference from '../levels/TimeDifference';
import TimeDifferenceMinutes from '../levels/TimeDifferenceMinutes';
import TimeDifferenceMinutesSecond from '../levels/TimeDifferenceMinutesSecond';
import TimeSum from '../levels/TimeSum';
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
    const [prevLevel, setPrevLevel] = useState<null | string>(null);

    const router = useRouter();

    const {level} = router.query;

    useEffect(() => {
        if(!prevLevel){
            setPrevLevel(String(level));
        }

        if(level !== prevLevel){
            setPrevLevel(String(level));
            setFoundTask(false);
        }

        if(!foundTask){
            const taskOptions = tasks.filter((task) => task.level === String(level));

            if(taskOptions){
                setActiveTask(taskOptions[Math.floor(Math.random() * (taskOptions.length - 1))])
                setFoundTask(true);
            }
        }
    }, [activeTask, tasks, foundTask, level]);

    console.log(activeTask)

    if(!activeTask || !activeTask.type){
        return null;
    }

    if(activeTask.type === "age"){
        return <TypeAge />
    }

    if(activeTask.type === "time sum"){
        return <TimeSum />
    }

    if(activeTask.type === "time difference"){
        return <TimeDifference />
    }

    if(activeTask.type === "time difference minutes"){
        return <TimeDifferenceMinutes />
    }

    if(activeTask.type === "time difference minutes2"){
        return <TimeDifferenceMinutesSecond />
    }

    if(activeTask.type === "month amount"){
        return <MonthAmount />
    }

    return null;
}

export default DisplayLevel
