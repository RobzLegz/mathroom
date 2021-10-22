import React from 'react'
import Head from "next/head"
import RegisterContainer from '../../components/containers/auth/RegisterContainer';

function register() {
    return (
        <div className="auth">
            <Head>
                <title>MathRoom | Register</title>
            </Head>

            <RegisterContainer />
        </div>
    )
}

export default register
