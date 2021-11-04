import React from 'react'
import Head from "next/head"
import CommunityPageContainer from '../../components/containers/community/CommunityPageContainer';

function leaderboard() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Community</title>
            </Head>

            <CommunityPageContainer page={"home"} />
        </div>
    )
}

export default leaderboard
