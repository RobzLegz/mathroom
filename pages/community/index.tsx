import React from 'react'
import Head from "next/head"
import CommunityPageContainer from '../../components/containers/community/CommunityPageContainer';
import GameBackground from '../../components/background/GameBackground';

function index() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Community</title>
            </Head>

            <CommunityPageContainer page={"home"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default index
