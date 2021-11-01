import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import AccelerationCalculation from '../levels/AccelerationCalculation';
import DayAmount from '../levels/DayAmount';
import KilometersApart from '../levels/KilometersApart';
import MminToMh from '../levels/MminToMh';
import MonthAmount from '../levels/MonthAmount';
import RoadCalculation from '../levels/RoadCalculation';
import RoadCalculationSecond from '../levels/RoadCalculationSecond';
import RomanNumerals from '../levels/RomanNumerals';
import SecondAmount from '../levels/SecondAmount';
import SpeedCalculation from '../levels/SpeedCalculation';
import TimeAccelerationDistance from '../levels/TimeAccelerationDistance';
import TimeCalculation from '../levels/TimeCalculation';
import TimeDifference from '../levels/TimeDifference';
import TimeDifferenceMinutes from '../levels/TimeDifferenceMinutes';
import TimeDifferenceMinutesSecond from '../levels/TimeDifferenceMinutesSecond';
import TimeSum from '../levels/TimeSum';
import TypeAge from '../levels/TypeAge';
import UniformlySlowMotion from '../levels/UniformlySlowMotion';

interface Task{
    type: string;
}

const returnActiveTask = (type: string) => {
    if(type === "age"){
        return <TypeAge />
    }

    if(type === "time sum"){
        return <TimeSum />
    }

    if(type === "time difference"){
        return <TimeDifference />
    }

    if(type === "time difference minutes"){
        return <TimeDifferenceMinutes />
    }

    if(type === "time difference minutes2"){
        return <TimeDifferenceMinutesSecond />
    }

    if(type === "month amount"){
        return <MonthAmount />
    }

    if(type === "day amount"){
        return <DayAmount />
    }

    if(type === "second amount"){
        return <SecondAmount />
    }

    if(type === "roman numerals"){
        return <RomanNumerals />
    }

    if(type === "kilometers apart"){
        return <KilometersApart />
    }

    if(type === "road calculation"){
        return <RoadCalculation />
    }

    if(type === "road calculation2"){
        return <RoadCalculationSecond />
    }

    if(type === "time calculation"){
        return <TimeCalculation />
    }

    if(type === "m/min to m/h"){
        return <MminToMh />
    }

    if(type === "speed calculation"){
        return <SpeedCalculation />
    }

    if(type === "acceleration calculation"){
        return <AccelerationCalculation />
    }

    if(type === "uniformly slow motion"){
        return <UniformlySlowMotion />
    }

    if(type === "time from acceleration + distance"){
        return <TimeAccelerationDistance />
    }

    return null;
}

const DisplayLevelFromType = () => {
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
            setActiveTask(tasks[(Number(level) - 1)])
        }
    }, [activeTask, tasks, foundTask, level]);

    if(!activeTask || !activeTask.type){
        return null;
    }

    return returnActiveTask(activeTask.type);
}

export default DisplayLevelFromType