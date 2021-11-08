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

const options = [
    {
        rises: "08.00",
        sets: "17.00",
        correct: "Day is 9 hours long."
    },
    {
        rises: "06.30",
        sets: "22.00",
        correct: "Day is 15 hours and 30 minutes long."
    },
    {
        rises: "05.30",
        sets: "19.00",
        correct: "Day is 13 hours and 30 minutes long."
    },
    {
        rises: "05.45",
        sets: "17.00",
        correct: "Day is 11 hours and 15 minutes long."
    },
    {
        rises: "08.00",
        sets: "16.00",
        correct: "Day is 8 hours long."
    },
    {
        rises: "07.40",
        sets: "18.00",
        correct: "Day is 10 hours and 20 minutes long."
    },
    {
        rises: "04.50",
        sets: "19.20",
        correct: "Day is 13 hours and 30 minutes long."
    },
    {
        rises: "06.45",
        sets: "17.35",
        correct: "Day is 10 hours and 50 minutes long."
    }
]

const TimeDifference: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedHours, setSelectedHours] = useState<number>(0);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedOption] = useState(options[Math.floor(Math.random() * options.length)]);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedOption.correct !== `Day is ${selectedHours} hours${selectedMinutes > 0 ? ` and ${selectedMinutes} minutes` : ""} long.`){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedOption.correct !== `Day is ${selectedHours} hours${selectedMinutes > 0 ? ` and ${selectedMinutes} minutes` : ""} long.`){
            return dispatch(setNotification({type: "error", message: "Incorrect answer"}));
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
                            <p>Subtract sunrise time from sunset time. The First input is for hours, the second is for minutes.</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>The sun rises at {selectedOption.rises} and sets at {selectedOption.sets}. What is the length of the day?</strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <strong>Day is {selectedHours} hours {selectedMinutes > 0 && `and ${selectedMinutes} minutes`} long.</strong>
                    <div className="inputContainer">
                        <input
                            type="range"
                            min="0"
                            max="23"
                            value={selectedHours}
                            onChange={(e) => setSelectedHours(Number(e.target.value))}
                        />
                        <strong>{selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours}</strong>
                    </div>
                    <div className="inputContainer">
                        <input
                            type="range"
                            min="0"
                            max="59"
                            value={selectedMinutes}
                            onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                        />
                        <strong>{selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}</strong>
                    </div>
                    <div className="level__container__options__tools__instruction">
                        <small>Slide from left to right to change value</small>
                    </div>
                    <button className="level__container__options__tools__submit" onClick={(e) => completeLevel(e)}>Submit</button>
                    {userInfo.info.level > Number(level) && (
                        <button className="level__container__options__tools__next" onClick={(e) => {e.preventDefault();router.push(`/levels/${Number(level) + 1}`)}}>Next</button>
                    )}
                </div>
                <div className="level__container__options__ilustration">
                    <img src="/levels/sunriseset.svg" alt="two suns with arrows under or on top of sun, one sun is rising and one setting" />
                </div>
            </div>
        </form>
    )
}

export default TimeDifference
