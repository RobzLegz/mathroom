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
        </div>
    )
}

export default MenuContainer
