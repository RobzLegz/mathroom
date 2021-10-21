import React from 'react'
import Head from "next/head"
import LoginContainer from '../../components/containers/auth/LoginContainer';

function login() {
    return (
        <div className="auth">
            <Head>
                <title>MathRoom | Login</title>
            </Head>

            <LoginContainer />
        </div>
    )
}

export default login
