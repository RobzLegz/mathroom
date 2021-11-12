import React, { useEffect } from 'react'
import Head from "next/head"
import GameBackground from '../../../components/background/GameBackground';
import CommunityPageContainer from '../../../components/containers/community/CommunityPageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setPrevURL } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/dist/client/router';
import { checkForLogin } from '../../../requests/auth/requests';
import Notification from '../../../components/notifications/Notification';
import { getUnreviewedLevels } from '../../../requests/admin/requests';
import { selectAdmin } from '../../../redux/slices/adminSlice';

function index() {
    const userInfo = useSelector(selectUser);
    const adminInfo = useSelector(selectAdmin);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    useEffect(() => {
        if(router.pathname !== "/menu"){
            dispatch(setPrevURL(router.pathname));
        }

        if(userInfo.info && userInfo.info.role !== "admin"){
            router.push("/community");
        }else if(userInfo.info && userInfo.info.role === "admin" && userInfo.token && !adminInfo.levels){
            getUnreviewedLevels(userInfo.token, dispatch);
        }
    }, [userInfo.info, router]);

    if(!userInfo.info){
        return null;
    }

    if(userInfo.info.role !== "admin"){
        return null;
    }

    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Admin</title>
            </Head>
            
            <Notification />

            <CommunityPageContainer page={"admin"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default index
