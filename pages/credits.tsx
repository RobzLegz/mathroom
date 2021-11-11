import React from "react";
import Head from "next/head";
import CreditContainer from "../components/containers/credits/CreditContainer";

const credits = () => {
    return (
        <div className="credits">
            <Head>
                <title>MathRoom | Credits</title>
            </Head>

            <CreditContainer />
        </div>
    )
}

export default credits