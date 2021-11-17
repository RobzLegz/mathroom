import React, { useEffect } from "react"
import Head from "next/head"
import PrivacyPolicy from "../components/containers/privacyPolicy/PrivacyPolicy";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { setPrevURL } from "../redux/slices/userSlice";

function privacyPolicy() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPrevURL(router.pathname));
    }, [router]);

    return (
        <div className="privacyPolicy">
            <Head>
                <title>MathRoom | Privacy policy</title>
                <link rel="icon" type="image/x-icon" href="/svg/timer.svg"></link>
            </Head>

            <PrivacyPolicy />
        </div>
    )
}

export default privacyPolicy
