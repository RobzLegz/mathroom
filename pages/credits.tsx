import React from "react";
import Head from "next/head";
import CreditContainer from "../components/containers/credits/CreditContainer";
import GameBackground from "../components/background/GameBackground";

const credits = () => {
    return (
        <div className="credits">
            <Head>
                <title>MathRoom | Credits</title>
            </Head>

            <GameBackground color={"purple"} />

            <CreditContainer />
        </div>
    )
}

export default credits