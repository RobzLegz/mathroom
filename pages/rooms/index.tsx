import React from "react"
import Head from "next/head"
import RoomContainer from "../../components/containers/rooms/RoomContainer";

const index: React.FC = () => {
    return (
        <div className="roomPage">
            <Head>
                <title>MathRoom | Rooms</title>
            </Head>
            
            <RoomContainer />
        </div>
    )
}

export default index
