import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import tasks from '../data/tasks';
import AccelerationCalculation from '../levels/AccelerationCalculation';
import AverageTrainSpeed from '../levels/AverageTrainSpeed';
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

const renderActiveTaskFromType = (type: string) => {
    if(type === "age") return <TypeAge />;
    else if(type === "time sum") return <TimeSum />;
    else if(type === "time difference") return <TimeDifference />;
    else if(type === "time difference minutes") return <TimeDifferenceMinutes />;
    else if(type === "time difference minutes2") return <TimeDifferenceMinutesSecond />;
    else if(type === "month amount") return <MonthAmount />;
    else if(type === "day amount") return <DayAmount />;
    else if(type === "second amount") return <SecondAmount />;
    else if(type === "roman numerals") return <RomanNumerals />;
    else if(type === "kilometers apart") return <KilometersApart />;
    else if(type === "road calculation") return <RoadCalculation />;
    else if(type === "road calculation2") return <RoadCalculationSecond />;
    else if(type === "time calculation") return <TimeCalculation />;
    else if(type === "m/min to m/h") return <MminToMh />;
    else if(type === "speed calculation") return <SpeedCalculation />;
    else if(type === "acceleration calculation") return <AccelerationCalculation />;
    else if(type === "uniformly slow motion") return <UniformlySlowMotion />;
    else if(type === "time from acceleration + distance") return <TimeAccelerationDistance />;
    else if(type === "average train speed") return <AverageTrainSpeed />;

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

    return renderActiveTaskFromType(activeTask.type);
}

export default DisplayLevelFromType;