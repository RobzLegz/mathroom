import React from 'react'
import Head from "next/head"
import RegisterContainer from '../../components/containers/auth/RegisterContainer';
import Notification from '../../components/notifications/Notification';

function register() {
    return (
        <div className="auth">
            <Head>
                <title>MathRoom | Register</title>
            </Head>

            <Notification />

            <RegisterContainer />
        </div>
    )
}

export default register
