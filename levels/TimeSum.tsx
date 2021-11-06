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
        leaves: "2:00",
        spends: "4 hours and 22 minutes",
        correct: "06:22"
    },
    {
        leaves: "15:30",
        spends: "3 hours and 15 minutes",
        correct: "18:45"
    },
    {
        leaves: "10:40",
        spends: "6 hours and 50 minutes",
        correct: "17:30"
    },
    {
        leaves: "23:00",
        spends: "2 hours and 20 minutes",
        correct: "01:20"
    },
    {
        leaves: "18:00",
        spends: "1 hour and 50 minutes",
        correct: "19:50"
    }
]

const TimeSum: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
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
            if(selectedOption.correct !== `${selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours}:${selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}`){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedOption.correct !== `${selectedHours.toString().length === 1 ? `0${selectedHours}` : selectedHours}:${selectedMinutes.toString().length === 1 ? `0${selectedMinutes}` : selectedMinutes}`){
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
                        <p>Add travel time to departure time. The first checkbox is for hours, the second is for minutes.</p>
                    </div>
                    <div className="buttonContainer">
                        <button onClick={() => setNeedHelp(false)}>Okay</button>
                    </div>
                </div>
            </div>
            )}
            
            <div className="level__container__task">
                <strong>What time will the train arrive at the terminal if it leaves at {selectedOption.leaves} and spends {selectedOption.spends} on the way?</strong>
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
                    <img src="/levels/train.svg" alt="gray train on a railroad" />
                </div>
            </div>
        </form>
    )
}

export default TimeSum
