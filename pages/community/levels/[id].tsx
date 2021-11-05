import React, { useEffect } from 'react'
import Head from "next/head"
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { getCommunityLevelById } from '../../../requests/community/levels/requests';
import CommunityActiveLevel from '../../../components/containers/levels/CommunityActiveLevel';
import Notification from '../../../components/notifications/Notification';
import GameBackground from '../../../components/background/GameBackground';

function activeCommunityLevel() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {id} = router.query;

    useEffect(() => {
        if(typeof(id) === "string"){
            getCommunityLevelById(id, dispatch);
        }
    }, [id]);

    return (
        <div className="communityLevelPage">
            <Head>
                <title>MathRoom | Community level</title>
            </Head>

            <CommunityActiveLevel />

            <Notification />

            <GameBackground color={"purple"} />
        </div>
    )
}

export default activeCommunityLevel
