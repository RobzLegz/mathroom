import React from "react";
import Head from "next/head";
import NewRoomContainer from "../../components/containers/rooms/NewRoomContainer";

function newRoom() {
    return (
        <div className="newRoom">
            <Head>
                <title>MathRoom | New</title>
            </Head>

            <NewRoomContainer />
        </div>
    )
}

export default newRoom
