import React from 'react'
import Head from "next/head"
import LoginContainer from '../../components/containers/auth/LoginContainer';
import Notification from '../../components/notifications/Notification';
import GameBackground from '../../components/background/GameBackground';

function login() {
    return (
        <div className="auth">
            <Head>
                <title>MathRoom | Login</title>
            </Head>

            <Notification />

            <LoginContainer />

            <GameBackground color="purple" />
        </div>
    )
}

export default login
