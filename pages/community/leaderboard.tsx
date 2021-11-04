import React from 'react'
import Head from "next/head"
import CommunityPageContainer from '../../components/containers/community/CommunityPageContainer';
import GameBackground from '../../components/background/GameBackground';

function leaderboard() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Leaderboard</title>
            </Head>

            <CommunityPageContainer page={"leaderboard"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default leaderboard
