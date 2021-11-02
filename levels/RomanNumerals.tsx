import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';

interface Props{
    needHelp: boolean;
}

const options = [
    {
        image: "/jpg/levels/clock1.jpg",
        correct: "00:05",
        correct2: "12:05",
    },
    {
        image: "/jpg/levels/clock2.jpg",
        correct: "22:08",
        correct2: "10:08",
    },
    {
        image: "/jpg/levels/clock3.jpg",
        correct: "15:09",
        correct2: "03:09",
    },
    {
        image: "/jpg/levels/clock4.jpg",
        correct: "15:00",
        correct2: "03:00",
    },
    {
        image: "/jpg/levels/clock5.jpg",
        correct: "23:45",
        correct2: "11:45",
    },
]

const RomanNumerals: React.FC<Props> = ({needHelp}) => {
    const userInfo = useSelector(selectUser);

    const [selectedHours, setSelectedHours] = useState<number>(0);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedOption] = useState(options[Math.floor(Math.random() * options.length)]);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(selectedOption.correct !== `${selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours}:${selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}` && selectedOption.correct2 !== `${selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours}:${selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}`){
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
                    <p>I = 1</p>
                    <p>V = 5</p>
                    <p>X = 10</p>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>What time it says on the clock?</strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <strong>{selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours} : {selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}</strong>
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
                    <img src={selectedOption.image} alt="clock with roman numerals" />
                </div>
            </div>
        </form>
    )
}

export default RomanNumerals
