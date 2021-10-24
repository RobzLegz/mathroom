import React from "react";
import Head from "next/head";
import NewRoomContainer from "../../components/containers/rooms/NewRoomContainer";
import Notification from "../../components/notifications/Notification";

function newRoom() {
    return (
        <div className="newRoom">
            <Head>
                <title>MathRoom | New</title>
            </Head>

            <Notification />

            <NewRoomContainer />
        </div>
    )
}

export default newRoom
