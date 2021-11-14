import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';
import { completeSocketLevel } from '../socket/options';

interface Props{
    needHelp: boolean;
    setNeedHelp: any;
    multiplayer: boolean;
}

const BatteryCharging: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [writing, setWriting] = useState<boolean>(false);
    const [taskChargingSpeed, setTaskChargingSpeed] = useState<number>(0);
    const [taskChargingTime, setTaskChargingTime] = useState<number>(0);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    useEffect(() => {
        let fullPercentage = 100;

        let chargingSpeed = Math.floor((Math.random() * 10) + 2);

        let chargingTime = fullPercentage / chargingSpeed;

        while (chargingTime !== Math.floor(chargingTime)){
            chargingSpeed = Math.floor((Math.random() * 10) + 2);
            chargingTime = fullPercentage / chargingSpeed;
        }

        setTaskChargingSpeed(chargingSpeed);
        setTaskChargingTime(chargingTime)
    }, []);

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedValue !== taskChargingTime){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedValue !== taskChargingTime){
            return dispatch(setNotification({type: "error", message: "Incorrect answer!"}));
        }

        if(userInfo.info){
            if(userInfo.info.level > Number(level)){
                dispatch(setNotification({type: "success", message: "Congrats, You answered correctly!"}));
                return router.push(`/levels/${Number(level) + 1}`)
            }

            if(userInfo.level < Number(level)){
                dispatch(setNotification({type: "error", message: "You can't be on this level"}));
                return router.push("/levels")
            }

            nextLevel(Number(level), userInfo.token, router, dispatch);
        }
    }

    return (
        <form className="level__age level__container">
            {needHelp && (
                <div className="level__container__tip">
                    <div className="level__container__tip__inner">
                        <div className="level__container__tip__inner__close" onClick={() => setNeedHelp(false)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                        </div>
                        <div className="level__container__tip__inner__text">
                            <p>Divide 100 by charging speed to get the time.</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>Phone battery is charging at a speed of {taskChargingSpeed}% per minute, how long will it take to be fully charged? (in minutes)</strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="inputContainer">
                        {writing ? (
                            <input
                                type="number"
                                value={selectedValue.toString()}
                                onChange={(e) => {if(e.target.value.length > 3){return}setSelectedValue(Number(e.target.value))}}
                            />
                        ) : (
                            <input
                                type="range"
                                value={selectedValue}
                                onChange={(e) => setSelectedValue(Number(e.target.value))}
                                min="0"
                                max="50"
                            />
                        )}
                        <strong onClick={() => setWriting(!writing)}>{selectedValue}</strong>
                    </div>
                    <div className="level__container__options__tools__instruction">
                        <small>Slide from left to right to change value or click the number next to it to write result</small>
                    </div>
                    <button className="level__container__options__tools__submit" onClick={(e) => completeLevel(e)}>Submit</button>
                    {userInfo.info.level > Number(level) && (
                        <button className="level__container__options__tools__next" onClick={(e) => {e.preventDefault();router.push(`/levels/${Number(level) + 1}`)}}>Next</button>
                    )}
                </div>
                <div className="level__container__options__ilustration">
                    <img src="/levels/grandmaWithCookies.svg" alt="grandma cooking cookies" />
                </div>
            </div>
        </form>
    )
}

export default BatteryCharging