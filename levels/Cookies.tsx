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

const Cookies: React.FC<Props> = ({needHelp, setNeedHelp, multiplayer}) => {
    const userInfo = useSelector(selectUser);

    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [time] = useState<number>(Math.floor((Math.random() * 4) + 2));
    const [cookies] = useState<number>(Math.floor((Math.random() * 3) + 3));
    const [correctValue] = useState<number>(time * cookies);

    const dispatch = useDispatch();
    const router = useRouter();

    const {level} = router.query;

    const completeLevel = (e: any) => {
        e.preventDefault();

        if(multiplayer){
            if(selectedValue !== correctValue){
                return completeSocketLevel(false, dispatch);
            }
            return completeSocketLevel(true, dispatch);
        }

        if(selectedValue !== correctValue){
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
                            <p>Multiply batches of cookies cooked in one hour by total amount of time spent cooking.</p>
                            <strong>To change value, click on cookie, but to reset it, click on reset button.</strong>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="level__container__task">
                <strong>Grandma can cook {cookies} cookies in 1 hour. How many cookies can be cooked in {time} hours?</strong>
            </div>
            <div className="level__container__options">
                <div className="level__container__options__tools">
                    <div className="clickerContainer" onClick={() => setSelectedValue(selectedValue + 1)}>
                        <img src="https://image.flaticon.com/icons/png/512/614/614131.png" alt="cookie" />
                        <div className="clickerContainer__overlay">
                            <strong className="white">{selectedValue}</strong>
                        </div>
                    </div>
                    <button className="resetValue" onClick={(e) => {e.preventDefault();setSelectedValue(0)}}>reset</button>
                    <button className="level__container__options__tools__submit" onClick={(e) => completeLevel(e)}>Submit</button>
                    {userInfo.info.level > Number(level) && (
                        <button className="level__container__options__tools__next" onClick={(e) => {e.preventDefault();router.push(`/levels/${Number(level) + 1}`)}}>Next</button>
                    )}
                </div>
                <div className="level__container__options__ilustration">
                    <img src="https://i.pinimg.com/originals/61/72/9a/61729a5e040ba3605537bb1441ba7015.jpg" alt="grandma cooking cookies" />
                </div>
            </div>
        </form>
    )
}

export default Cookies