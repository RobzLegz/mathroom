import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../redux/slices/notificationSlice';
import { selectUser } from '../../../redux/slices/userSlice';

function MenuContainer() {
    const userInfo = useSelector(selectUser);
    
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div className="menu__container">
            <h1>MATHROOM</h1>

            <div className="menu__container__options">
                <button className="button button__play" onClick={() => {if(!userInfo.loggedIn || !userInfo.token){return dispatch(setNotification({type: "error", message: "You must be logged in to play games!"}))}router.push("/rooms")}}>Play</button>
                <button className="button" onClick={() => router.push("/instructions")}>Instructions</button>
                {!userInfo.loggedIn || !userInfo.token && (<button className="button" onClick={() => router.push("/auth/login")}>Authorize</button>)}
            </div>

            <div className="menu__container__decorations">
                <img className="image image1" src="/svg/sandClock.svg" alt="sand clock ticking in blue color slightly rotated to right side" />
                <img className="image image2" src="/svg/clock.svg" alt="clock with two arrows in red color slightly rotated to left side" />
                <img className="image image3" src="/svg/timer.svg" alt="purple timer ticking" />
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
                <div className="line line4"></div>
                <div className="line line5"></div>
                <div className="line line6"></div>
                <div className="line line7"></div>
                <div className="line line8"></div>
            </div>
        </div>
    )
}

export default MenuContainer
