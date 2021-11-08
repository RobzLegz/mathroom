import React from "react"
import Head from "next/head"
import PrivacyPolicy from "../components/containers/privacyPolicy/PrivacyPolicy";

function privacyPolicy() {
    return (
        <div className="privacyPolicy">
            <Head>
                <title>MathRoom | Privacy policy</title>
            </Head>

            <PrivacyPolicy />
        </div>
    )
}

export default privacyPolicy
