import React, { useEffect } from 'react'
import Head from "next/head"
import { useRouter } from 'next/dist/client/router';
import Notification from '../../../components/notifications/Notification';
import UserPageContainer from '../../../components/containers/user/UserPageContainer';
import GameBackground from '../../../components/background/GameBackground';
import { setPrevURL } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

function username() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {username} = router.query;

    useEffect(() => {
        if(router.pathname !== "/menu"){
            dispatch(setPrevURL(router.pathname));
        }
    }, [router]);

    return (
        <div className="profilePage">
            <Head>
                <title>MathRoom | {username}</title>
            </Head>

            <Notification />

            <UserPageContainer />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default username
