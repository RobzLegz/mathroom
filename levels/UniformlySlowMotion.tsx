import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
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

const UniformlySlowMotion: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedAge, setSelectedAge] = useState<number>(10);
    const [startingSpeed] = useState<number>(Math.floor((Math.random() * 70) + 40));
    const [acceleration] = useState<number>(Math.floor((Math.random() * 5) + 2));
    const [time] = useState<number>(Math.floor((Math.random() * 7) + 2));
    const [finalSpeed] = useState<number>(startingSpeed + acceleration * time);
    const [writing, setWriting] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedAge !== finalSpeed){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedAge !== finalSpeed){
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
                            <img src="/levels/instructions/UniformallySlowMotion.svg" alt="formula for calculating the final speed of a car" />
                            <p>Put the numbers in the formula correctly.</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>A car is driving at a speed of {startingSpeed} km/h and it accelerates for {time} seconds with the acceleration of {acceleration} km/sec. What is the final speed of the car?</strong>
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
                                max="120"
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
                    <img src="/levels/car1.png" alt="blue car with gray wheels" />
                </div>
            </div>
        </form>
    )
}

export default UniformlySlowMotion
