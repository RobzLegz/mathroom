import React from 'react'
import Head from "next/head"
import GameBackground from '../../../components/background/GameBackground';
import NewLevelContainer from '../../../components/containers/levels/NewLevelContainer';

function newLevel() {
    return (
        <div className="communityPage">
            <Head>
                <title>MathRoom | Community</title>
            </Head>

            <NewLevelContainer />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default newLevel