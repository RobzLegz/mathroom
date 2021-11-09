import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications, setNotification } from '../../../redux/slices/notificationSlice';
import { load, selectUser } from '../../../redux/slices/userSlice';
import GameBackground from '../../background/GameBackground';

function MenuContainer() {
    const notificationInfo = useSelector(selectNotifications);
    const userInfo = useSelector(selectUser);

    const [loaded, setLoaded] = useState(false);
    
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(notificationInfo.type !== "loading" && !userInfo.pageLoaded){
            setTimeout(() => {
                setLoaded(true);
            }, 4000);

            setTimeout(() => {
                dispatch(load());
            }, 9000);
        }
    }, [notificationInfo.type, userInfo.pageLoaded]);

    if(notificationInfo.type === "loading"){
        return null;
    }
    
    return (
        <div className={`menu__container ${userInfo.pageLoaded ? "" : "menu__containerUnloaded"}`}>
            <h1>MATHROOM</h1>

            <div className={`menu__container__options ${loaded ? "menu__container__optionsLoaded" : ""}`}>
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
                        <button onClick={() => router.push(`/community/user/${userInfo.info.username}`)}>Profile</button>
                    </div>
                ) : (
                    <button className="button" onClick={() => router.push("/instructions")}>Instructions</button>
                )}
            </div>

            <div className="menu__container__decorations">
                <img className={`image image1 ${loaded ? "image__loaded" : ""}`} src="/svg/sandClock.svg" alt="sand clock ticking in blue color slightly rotated to right side" />
                <img className={`image image2 ${loaded ? "image__loaded" : ""}`} src="/svg/clock.svg" alt="clock with two arrows in red color slightly rotated to left side" />
                <img className={`image image3 ${loaded ? "image__loaded" : ""}`} src="/svg/timer.svg" alt="purple timer ticking" />
            </div>
            
            <GameBackground color={"purple"} />
        </div>
    )
}

export default MenuContainer
