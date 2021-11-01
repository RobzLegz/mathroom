import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { selectUser } from '../redux/slices/userSlice';
import { nextLevel } from '../requests/levels/requests';

const MonthAmount: React.FC = () => {
    const userInfo = useSelector(selectUser);

    const [selectedAge, setSelectedAge] = useState<number>(1);
    const [years] = useState<number>(Math.floor((Math.random() * 5) + 1));
    const [months] = useState<number>(Math.floor((Math.random() * 11) + 1));
    const [age] = useState<number>(Math.floor((Math.random() * 19) + 14));
    const [needHelp, setNeedHelp] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(selectedAge !== ((years * 12) + months)){
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
                    <p>subtract the months and years of the wanted age from the current age.</p>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>Peter's {age}th birthday is in {years} years and {months} months. After how many months Peter is going to be {age} years old?<img src="/svg/question.svg" alt="question mark inside circle" onClick={() => setNeedHelp(!needHelp)} /></strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="inputContainer">
                        <input
                            type="range"
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(Number(e.target.value))}
                            min="1"
                            max="80"
                        />
                        <strong>{selectedAge}</strong>
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
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wSFbjLZV5FropOTZA0gnWgHaE7&pid=Api" alt="sus" />
                </div>
            </div>
        </form>
    )
}

export default MonthAmount
