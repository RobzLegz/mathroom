import React from 'react'
import Head from "next/head"
import LoginContainer from '../../components/containers/auth/LoginContainer';
import Notification from '../../components/notifications/Notification';

function login() {
    return (
        <div className="auth">
            <Head>
                <title>MathRoom | Login</title>
            </Head>

            <Notification />

            <LoginContainer />
        </div>
    )
}

export default login
