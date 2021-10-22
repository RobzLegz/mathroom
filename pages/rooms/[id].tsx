import React, { useEffect } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux";
import { getRoomInfo } from "../../requests/rooms/requests";
import { useRouter } from "next/dist/client/router";
import { selectRooms } from "../../redux/slices/roomSlice";
import ActiveRoom from "../../components/containers/rooms/ActiveRoom";
import { selectUser } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { joinRoom } from "../../socket/options";

function room() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);

    const router = useRouter();
    const dispatch = useDispatch();

    const {id} = router.query;

    useEffect(() => {
        if(id && typeof(id) === "string" && !roomInfo.activeRoom){
            getRoomInfo(id, dispatch);
        }
    }, [id, dispatch, roomInfo.rooms]);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch);
            }
        }
    }, [userInfo.loggedIn, dispatch]);

    useEffect(() => {
        if(userInfo.info){
            joinRoom(id, userInfo.info);
        }
    }, [id, userInfo.info]);

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
