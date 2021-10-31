import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import Notification from "../../components/notifications/Notification";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { setNotification } from "../../redux/slices/notificationSlice";

function Level() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {level} = router.query;

    const userInfo = useSelector(selectUser);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token, router]);

    useEffect(() => {
        if(userInfo.info){
            if(userInfo.info.level < Number(level)){
                router.push("/levels");
                dispatch(setNotification({type: "error", message: "You haven't done the previous levels!"}));
            }
        }
    }, [userInfo.info]);

    if(userInfo.info && userInfo.info.level >= Number(level)){
        return (
            <div>
                <Head>
                    <title>MathRoom | Level {level}</title>
                </Head>
    
                <Notification />

                <h1>hello</h1>
            </div>
        )
    }
    return null;
}

export default Level;
