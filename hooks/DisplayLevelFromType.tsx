import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import tasks from '../data/tasks';
import AccelerationCalculation from '../levels/AccelerationCalculation';
import AverageSpeed from '../levels/AverageSpeed';
import DayAmount from '../levels/DayAmount';
import DistanceBetween2 from '../levels/DistanceBetween2';
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
import { setNotification } from '../redux/slices/notificationSlice';

interface Task{
    type: string;
}

interface Props{
    needHelp: boolean;
    setNeedHelp: any;
}

const renderActiveTaskFromType = (type: string, needHelp: boolean, setNeedHelp: any) => {
    if(type === "age") return <TypeAge needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time sum") return <TimeSum needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time difference") return <TimeDifference needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time difference minutes") return <TimeDifferenceMinutes needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time difference minutes2") return <TimeDifferenceMinutesSecond needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "month amount") return <MonthAmount needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "day amount") return <DayAmount needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "second amount") return <SecondAmount needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "roman numerals") return <RomanNumerals needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "kilometers apart") return <KilometersApart needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "road calculation") return <RoadCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "road calculation2") return <RoadCalculationSecond needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time calculation") return <TimeCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "m/min to m/h") return <MminToMh needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "speed calculation") return <SpeedCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "acceleration calculation") return <AccelerationCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "uniformly slow motion") return <UniformlySlowMotion needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "time from acceleration + distance") return <TimeAccelerationDistance needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "average speed") return <AverageSpeed needHelp={needHelp} setNeedHelp={setNeedHelp} />;
    else if(type === "distance between2") return <DistanceBetween2 needHelp={needHelp} setNeedHelp={setNeedHelp} />;

    return null;
}

const DisplayLevelFromType: React.FC<Props> = ({needHelp, setNeedHelp}) => {
    const [foundTask, setFoundTask] = useState<boolean>(false);
    const [activeTask, setActiveTask] = useState<null | Task>(null);
    const [prevLevel, setPrevLevel] = useState<null | string>(null);

    const dispatch = useDispatch();
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

        if(tasks.length <= Number(level)){
            dispatch(setNotification({type: "success", message: "Congrats, You have completed all levels!"}));
            router.push("/levels");
        }else{
            if(!foundTask){
                setActiveTask(tasks[(Number(level) - 1)])
            }
        }
    }, [activeTask, tasks, foundTask, level]);

    if(!activeTask || !activeTask.type){
        return null;
    }

    return renderActiveTaskFromType(activeTask.type, needHelp, setNeedHelp);
}

export default DisplayLevelFromType;