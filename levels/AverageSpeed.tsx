import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';

interface Props{
    needHelp: boolean;
    setNeedHelp: any;
    multiplayer: boolean;
}

const AverageSpeed: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedAge, setSelectedAge] = useState<number>(10);
    const [startingSpeed, setStartingSpeed] = useState<number>(0);
    const [acceleratedSpeed, setAcceleratedSpeed] = useState<number>(startingSpeed + Math.floor((Math.random() * 40) + 20));
    const [activeTransport, setActiveTransport] = useState<string>("");
    const [writing, setWriting] = useState<boolean>(false);
    const [changeTask, setChangeTask] = useState<boolean>(true);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    useEffect(() => {
        if(changeTask){
            setChangeTask(false);
        }

        let startingS = Math.floor((Math.random() * 100) + 60);
        setStartingSpeed(startingS);

        let acceleratedS = startingS + Math.floor((Math.random() * 30) + 20);

        while ((acceleratedS + startingS) % 2 !== 0){
            acceleratedS = startingS + Math.floor((Math.random() * 30) + 20);
        }

        setAcceleratedSpeed(acceleratedS);

        if(acceleratedS > 120){
            setActiveTransport("train")
        }else{
            setActiveTransport("car")
        }
    }, [changeTask]);

    const completeLevel = (e: any) => {
        e.preventDefault();
        setChangeTask(true);

        if(selectedAge !== ((startingSpeed + acceleratedSpeed) / 2)){
            setChangeTask(true);
            return dispatch(setNotification({type: "error", message: "Incorrect answer!"}));
        }

        if(userInfo.info){
            if(userInfo.info.level > Number(level)){
                dispatch(setNotification({type: "success", message: "Congrats, You answered correctly!"}));
                return router.push(`/levels/${Number(level) + 1}`);
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
                            <p></p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>A {activeTransport} traveled at a speed of {startingSpeed} km/h, after some time, it accelerated to {acceleratedSpeed} km/h. What was the average speed of the {activeTransport}?</strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="inputContainer">
                        {writing ? (
                            <input
                                type="number"
                                value={selectedAge.toString()}
                                onChange={(e) => {if(e.target.value.length > 3){return}setSelectedAge(Number(e.target.value))}}
                            />
                        ) : (
                            <input
                                type="range"
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(Number(e.target.value))}
                                min="10"
                                max="150"
                            />
                        )}
                        <strong onClick={() => setWriting(!writing)}>{selectedAge}</strong>
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
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wSFbjLZV5FropOTZA0gnWgHaE7&pid=Api" alt="sus" />
                </div>
            </div>
        </form>
    )
}

export default AverageSpeed