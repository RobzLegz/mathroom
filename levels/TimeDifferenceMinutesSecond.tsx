import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';

const TimeDifferenceMinutesSecond: React.FC = () => {
    const userInfo = useSelector(selectUser);

    const [selectedAge, setSelectedAge] = useState<number>(5);
    const [totalTimeSpent] = useState<number>(Math.floor((Math.random() * 600) + 30));
    const [needHelp, setNeedHelp] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(selectedAge !== (Math.floor(totalTimeSpent / 60) * 16)){
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
                    <p> Start by dividing by 60 to get the hours, then multiply by the hourly rate. The answer is rounded.({new Date().getFullYear()})</p>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>The hourly rate is 16$/hour. If You spend {totalTimeSpent} minutes working, how much You earn?</strong>
                <img src="/svg/question.svg" alt="question mark inside circle" onClick={() => setNeedHelp(!needHelp)} />
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="inputContainer">
                        <input
                            type="range"
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(Number(e.target.value))}
                            min="0"
                            max="180"
                        />
                        <strong>{selectedAge}</strong>
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

export default TimeDifferenceMinutesSecond
