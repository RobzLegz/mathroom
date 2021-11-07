import React from 'react'
import Head from "next/head"
import { useRouter } from 'next/dist/client/router';

function username() {
    const router = useRouter();

    const {username} = router.query;

    return (
        <div>
            <Head>
                <title>MathRoom | {username}</title>
            </Head>
        </div>
    )
}

export default username
