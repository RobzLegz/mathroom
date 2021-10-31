import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import DayAmount from '../levels/DayAmount';
import KilometersApart from '../levels/KilometersApart';
import MonthAmount from '../levels/MonthAmount';
import RoadCalculation from '../levels/RoadCalculation';
import RoadCalculationSecond from '../levels/RoadCalculationSecond';
import RomanNumerals from '../levels/RomanNumerals';
import SecondAmount from '../levels/SecondAmount';
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

    if(activeTask.type === "day amount"){
        return <DayAmount />
    }

    if(activeTask.type === "second amount"){
        return <SecondAmount />
    }

    if(activeTask.type === "roman numerals"){
        return <RomanNumerals />
    }

    if(activeTask.type === "kilometers apart"){
        return <KilometersApart />
    }

    if(activeTask.type === "road calculation"){
        return <RoadCalculation />
    }

    if(activeTask.type === "road calculation2"){
        return <RoadCalculationSecond />
    }

    return null;
}

export default DisplayLevel
