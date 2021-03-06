import React, { useEffect } from "react";
import Head from "next/head";
import Notification from "../../components/notifications/Notification";
import LevelContainer from "../../components/containers/levels/LevelContainer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPrevURL } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { useRouter } from "next/dist/client/router";
import GameBackground from "../../components/background/GameBackground";

function index() {
    const userInfo = useSelector(selectUser);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }

        if(router.pathname !== "/menu"){
            dispatch(setPrevURL(router.pathname));
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token, router]);

    return (
        <div className="levels">
            <Head>
                <title>MathRoom | Levels</title>
            </Head>

            <Notification />

            <LevelContainer />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default index
