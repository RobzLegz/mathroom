import React from 'react'
import Head from "next/head"
import { useRouter } from 'next/dist/client/router';
import Notification from '../../../components/notifications/Notification';
import UserPageContainer from '../../../components/containers/user/UserPageContainer';
import GameBackground from '../../../components/background/GameBackground';

function username() {
    const router = useRouter();

    const {username} = router.query;

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
