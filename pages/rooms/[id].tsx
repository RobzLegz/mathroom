import React, { useEffect } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux";
import { getRoomInfo } from "../../requests/rooms/requests";
import { useRouter } from "next/dist/client/router";
import { selectRooms } from "../../redux/slices/roomSlice";
import ActiveRoom from "../../components/containers/rooms/ActiveRoom";

function room() {
    const roomInfo = useSelector(selectRooms);

    const router = useRouter();
    const dispatch = useDispatch();

    const {id} = router.query;

    useEffect(() => {
        if(id && typeof(id) === "string" && !roomInfo.rooms){
            getRoomInfo(id, dispatch);
        }
    }, [id, dispatch, roomInfo.rooms]);

    return (
        <div className="gameRoom">
            <Head>
                <title>MathRoom | Play</title>
            </Head>

            <ActiveRoom />
        </div>
    )
}

export default room
