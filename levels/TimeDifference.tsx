import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';

const options = [
    {
        rises: "08.00",
        sets: "17.00",
        correct: "Day is 9 hours long."
    }
]

const TimeDifference: React.FC = () => {
    const userInfo = useSelector(selectUser);

    const [selectedHours, setSelectedHours] = useState<number>(0);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedOption] = useState(options[Math.floor(Math.random() * options.length)]);
    const [needHelp, setNeedHelp] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    console.log(`Day is ${selectedHours} hours${selectedMinutes > 0 ? ` and ${selectedMinutes} minutes` : ""} long.`);
    console.log(selectedOption.correct);

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(selectedOption.correct !== `Day is ${selectedHours} hours${selectedMinutes > 0 ? ` and ${selectedMinutes} minutes` : ""} long.`){
            return dispatch(setNotification({type: "error", message: "Incorrect answer"}));
        }

        if(userInfo.info){
            if(userInfo.info.level > Number(level)){
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
                    <p></p>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>The sun rises at {selectedOption.rises} and sets at {selectedOption.sets}. What is the length of the day?<img src="/svg/question.svg" alt="question mark inside circle" onClick={() => setNeedHelp(!needHelp)} /></strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <strong>Day is {selectedHours} hours {selectedMinutes > 0 && `and ${selectedMinutes} minutes`} long.</strong>
                    <div className="inputContainer">
                        <input 
                            type="range" 
                            min="8"
                            max="13"
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
                </div>
                <div className="level__container__options__ilustration">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wSFbjLZV5FropOTZA0gnWgHaE7&pid=Api" alt="sus" />
                </div>
            </div>
        </form>
    )
}

export default TimeDifference