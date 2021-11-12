import React, { useEffect } from 'react'
import Head from "next/head"
import CommunityPageContainer from '../../components/containers/community/CommunityPageContainer';
import GameBackground from '../../components/background/GameBackground';
import Notification from '../../components/notifications/Notification';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { setPrevURL } from '../../redux/slices/userSlice';

function leaderboard() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(router.pathname !== "/menu"){
            dispatch(setPrevURL(router.pathname));
        }
    }, [router]);

    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Leaderboard</title>
            </Head>

            <Notification />

            <CommunityPageContainer page={"leaderboard"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default leaderboard
