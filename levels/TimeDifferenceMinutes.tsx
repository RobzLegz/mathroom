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

const TimeDifferenceMinutes: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedAge, setSelectedAge] = useState<number>(10);
    const [totalTimeSpent] = useState<number>(Math.floor((Math.random() * 200) + 100));
    const [difference] = useState<number>(Math.floor((Math.random() * 59) + 20));
    const [correctAnswer] = useState<number>(totalTimeSpent - difference);
    const [writing, setWriting] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedAge !== correctAnswer){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedAge !== correctAnswer){
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
                            <p>To get other programmers time, subtract the first programmers time spent from total time spent.</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>Two programmers worked on a website for {totalTimeSpent} minutes together. How much time did the other programmer spend if the first spent {difference} minutes?</strong>
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
                                max="250"
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
                    <img src="/levels/programmers.svg" alt="a man and a woman standing next to each other" />
                </div>
            </div>
        </form>
    )
}

export default TimeDifferenceMinutes
