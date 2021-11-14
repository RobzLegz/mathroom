import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import tasks from '../data/tasks';
import AccelerationCalculation from '../levels/AccelerationCalculation';
import AverageSpeed from '../levels/AverageSpeed';
import BatteryCharging from '../levels/BatteryCharging';
import BatteryPercentage from '../levels/BatteryPercentage';
import CookieHeist from '../levels/CookieHeist';
import Cookies from '../levels/Cookies';
import DayAmount from '../levels/DayAmount';
import DistanceBetween2 from '../levels/DistanceBetween2';
import Flys from '../levels/Flys';
import KilometersApart from '../levels/KilometersApart';
import MonthAmount from '../levels/MonthAmount';
import PoolFill from '../levels/PoolFill';
import PoolSpill from '../levels/PoolSpill';
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
    multiplayer: boolean;
}

const renderActiveTaskFromType = (type: string, needHelp: boolean, setNeedHelp: any, multiplayer: boolean) => {
    switch(type){
        case "age": return <TypeAge needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "time sum": return <TimeSum needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "battery charging": return <BatteryCharging needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "time difference": return <TimeDifference needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "time difference minutes": return <TimeDifferenceMinutes needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "battery percecntage": return <BatteryPercentage needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />
        case "time difference minutes2": return <TimeDifferenceMinutesSecond needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "month amount": return <MonthAmount needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "day amount": return <DayAmount needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "second amount": return <SecondAmount needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "roman numerals": return <RomanNumerals needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "kilometers apart": return <KilometersApart needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "road calculation": return <RoadCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "road calculation2": return <RoadCalculationSecond needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "time calculation": return <TimeCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "speed calculation": return <SpeedCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "acceleration calculation": return <AccelerationCalculation needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "uniformly slow motion": return <UniformlySlowMotion needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "time from acceleration + distance": return <TimeAccelerationDistance needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "average speed": return <AverageSpeed needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "distance between2": return <DistanceBetween2 needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "pool fill": return <PoolFill needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "pool spill": return <PoolSpill needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "cookies": return <Cookies needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />;
        case "flys": return <Flys needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />
        case "cookie heist": return <CookieHeist needHelp={needHelp} setNeedHelp={setNeedHelp} multiplayer={multiplayer} />
    }

    return null;
}

const DisplayLevelFromType: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
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

        if(tasks.length < Number(level)){
            console.log(tasks.length)
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

    return renderActiveTaskFromType(activeTask.type, needHelp, setNeedHelp, multiplayer);
}

export default DisplayLevelFromType;
export {renderActiveTaskFromType};