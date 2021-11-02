import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications, setNotification } from '../../../redux/slices/notificationSlice';
import { selectUser } from '../../../redux/slices/userSlice';
import GameBackground from '../../background/GameBackground';

function MenuContainer() {
    const notificationInfo = useSelector(selectNotifications);
    const userInfo = useSelector(selectUser);
    
    const dispatch = useDispatch();
    const router = useRouter();

    const [showGamemodes, setShowGamemodes] = useState(false);
 
    if(notificationInfo.type || notificationInfo.message){
        return null;
    }
    
    return (
        <div className="menu__container">
            <h1>MATHROOM</h1>

            <div className="menu__container__options">
                {showGamemodes ? (
                    <>
                        <button className="button button__gamemode" onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/levels")}}>Singleplayer</button>
                        <button className="button button__gamemode" onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/rooms")}}>Multiplayer</button>
                    </>
                ) : (
                    <button className="button button__play" onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}setShowGamemodes(true)}}>Play</button>
                )}
                <button className="button" onClick={() => router.push("/instructions")}>Instructions</button>
                {userInfo.loggedIn && userInfo.token && userInfo.info ? (null) : <button className="button" onClick={() => router.push("/auth/login")}>Authorize</button>}
            </div>

            <div className="menu__container__decorations">
                <img className="image image1" src="/svg/sandClock.svg" alt="sand clock ticking in blue color slightly rotated to right side" />
                <img className="image image2" src="/svg/clock.svg" alt="clock with two arrows in red color slightly rotated to left side" />
                <img className="image image3" src="/svg/timer.svg" alt="purple timer ticking" />
            </div>
            
            <GameBackground color={"purple"} />
        </div>
    )
}

export default MenuContainer
