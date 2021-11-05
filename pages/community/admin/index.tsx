import React, { useEffect } from 'react'
import Head from "next/head"
import GameBackground from '../../../components/background/GameBackground';
import CommunityPageContainer from '../../../components/containers/community/CommunityPageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/dist/client/router';
import { checkForLogin } from '../../../requests/auth/requests';

function index() {
    const userInfo = useSelector(selectUser);

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
        if(userInfo.info && userInfo.info.role !== "admin"){
            router.push("/community");
        }
    }, [userInfo.info]);

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
            
            <CommunityPageContainer page={"admin"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default index
