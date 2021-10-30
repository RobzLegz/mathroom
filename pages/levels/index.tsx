import React from "react";
import Head from "next/head";
import Notification from "../../components/notifications/Notification";
import LevelContainer from "../../components/containers/levels/LevelContainer";

function index() {
    return (
        <div>
            <Head>
                <title>MathRoom | Levels</title>
            </Head>

            <Notification />

            <LevelContainer />
        </div>
    )
}

export default index
