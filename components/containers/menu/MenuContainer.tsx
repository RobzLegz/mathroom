import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications, setNotification } from '../../../redux/slices/notificationSlice';
import { selectUser } from '../../../redux/slices/userSlice';
import GameBackground from '../../background/GameBackground';

function MenuContainer() {
    const notificationInfo = useSelector(selectNotifications);
    const userInfo = useSelector(selectUser);
    
    const dispatch = useDispatch();
    const router = useRouter();

    if(notificationInfo.type === "loading"){
        return null;
    }
    
    return (
        <div className="menu__container">
            <h1>MATHROOM</h1>

            <div className="menu__container__options">
                {!userInfo.loggedIn || !userInfo.token ? (
                    <div className="menu__container__options__two">
                        <button onClick={() => router.push("/auth/login")}>Login</button>
                        <button onClick={() => router.push("/auth/register")}>Register</button>
                    </div>
                ) : (
                    null
                )}
                <button disabled={!userInfo.loggedIn || !userInfo.token} className={`button button__${!userInfo.loggedIn || !userInfo.token ? "disabled" : "enabled"}`} onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/levels")}}>Singleplayer</button>
                <button disabled={!userInfo.loggedIn || !userInfo.token} className={`button button__${!userInfo.loggedIn || !userInfo.token ? "disabled" : "enabled"}`} onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/rooms")}}>Multiplayer</button>
                <button disabled={!userInfo.loggedIn || !userInfo.token} className={`button button__${!userInfo.loggedIn || !userInfo.token ? "disabled" : "enabled"}`} onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/community")}}>Community</button>
                
                {userInfo.loggedIn || userInfo.token ? (
                    <div className="menu__container__options__two">
                        <button onClick={() => router.push("/instructions")}>Instructions</button>
                        <button>Profile</button>
                    </div>
                ) : (
                    <button className="button" onClick={() => router.push("/instructions")}>Instructions</button>
                )}
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
