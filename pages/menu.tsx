import { useRouter } from "next/dist/client/router";
import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuContainer from "../components/containers/menu/MenuContainer";
import Notification from "../components/notifications/Notification";
import { getSocket, selectSocket, setSocket } from "../redux/slices/socketSlice";
import { selectUser } from "../redux/slices/userSlice";
import { checkForLogin } from "../requests/auth/requests";

export default function Menu() {
    const userInfo = useSelector(selectUser);
    const socketInfo = useSelector(selectSocket);
    
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const socket = getSocket();

        if(!socketInfo.connected || !socket){
            dispatch(setSocket(true));
        }
    }, [socketInfo.connected]);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token, router]);

    return (
        <div className="menu">
            <Head>
                <title>MathRoom | Menu</title>
                <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
            </Head>

            <Notification />

            <MenuContainer />
        </div>
    )
}
