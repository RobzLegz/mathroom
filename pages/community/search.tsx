import React from 'react'
import Head from "next/head"
import CommunityPageContainer from '../../components/containers/community/CommunityPageContainer';
import GameBackground from '../../components/background/GameBackground';

function search() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Search</title>
            </Head>

            <CommunityPageContainer page={"search"} />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default search
