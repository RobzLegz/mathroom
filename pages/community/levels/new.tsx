import React from 'react'
import Head from "next/head"
import GameBackground from '../../../components/background/GameBackground';
import NewLevelContainer from '../../../components/containers/levels/NewLevelContainer';
import Notification from '../../../components/notifications/Notification';

function newLevel() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | New level</title>
            </Head>

            <Notification />

            <NewLevelContainer />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default newLevel