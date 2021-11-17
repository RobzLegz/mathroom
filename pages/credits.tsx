import React, { useEffect } from "react";
import Head from "next/head";
import CreditContainer from "../components/containers/credits/CreditContainer";
import GameBackground from "../components/background/GameBackground";
import { setPrevURL } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const credits = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(router.pathname !== "/menu"){
            dispatch(setPrevURL(router.pathname));
        }
    }, [router]);

    return (
        <div className="credits">
            <Head>
                <title>MathRoom | Credits</title>
                <link rel="icon" type="image/x-icon" href="/svg/timer.svg"></link>
            </Head>

            <GameBackground color={"purple"} />

            <CreditContainer />
        </div>
    )
}

export default credits