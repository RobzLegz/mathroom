import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';

function MenuContainer() {
    const userInfo = useSelector(selectUser);
    const router = useRouter();

    return (
        <div className="menu__container">
            <h1>MATHROOM</h1>

            <div className="menu__container__options">
                <button onClick={() => router.push("/rooms")}>Play</button>
                <button onClick={() => router.push("/instructions")}>Instructions</button>
                {!userInfo.loggedIn || !userInfo.token && (<button onClick={() => router.push("/auth/login")}>Authorize</button>)}
            </div>
        </div>
    )
}

export default MenuContainer
