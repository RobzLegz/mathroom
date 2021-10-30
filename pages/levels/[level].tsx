import React from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import Notification from "../../components/notifications/Notification";

function Level() {
    const router = useRouter();

    const {level} = router.query;

    return (
        <div>
            <Head>
                <title>MathRoom | Level {level}</title>
            </Head>

            <Notification />
        </div>
    )
}

export default Level;
