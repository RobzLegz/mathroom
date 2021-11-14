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

const BatteryPercentage: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [writing, setWriting] = useState<boolean>(false);
    const [taskChargingSpeed, setTaskChargingSpeed] = useState<number>(0);
    const [taskChargingTime, setTaskChargingTime] = useState<number>(0);
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    useEffect(() => {
        let chargingSpeed = Math.floor((Math.random() * 2) + 3);

        let time = Math.floor((Math.random() * 5) + 10);

        setTaskChargingSpeed(chargingSpeed);
        setTaskChargingTime(time);
        setCorrectAnswer(chargingSpeed * time);
    }, []);

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedValue !== correctAnswer){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedValue !== correctAnswer){
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
                            <p>Multiply charging time by charging speed.</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>Phone battery is empty and it's charging at a speed of {taskChargingSpeed}% per minute. How full the battery is going to be after {taskChargingTime} minutes?</strong>
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
                                max="100"
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
                    {
                        selectedValue > 80 ? (
                            <img src="/levels/battery5.svg" alt="battery" />
                        ) : selectedValue > 60 ? (
                            <img src="/levels/battery4.svg" alt="battery" />
                        ) : selectedValue > 40 ? (
                            <img src="/levels/battery3.svg" alt="battery" />
                        ) : selectedValue > 20 ? (
                            <img src="/levels/battery2.svg" alt="battery" />
                        ) : selectedValue > 10 ? (
                            <img src="/levels/battery1.svg" alt="battery" />
                        ) : (
                            <img src="/levels/battery0.svg" alt="battery" />
                        )
                    }
                </div>
            </div>
        </form>
    )
}

export default BatteryPercentage