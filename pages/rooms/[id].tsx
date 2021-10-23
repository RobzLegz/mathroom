import React, { useEffect } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux";
import { getRoomInfo } from "../../requests/rooms/requests";
import { useRouter } from "next/dist/client/router";
import { selectRooms, setRoomMessages, setRoomUsers } from "../../redux/slices/roomSlice";
import ActiveRoom from "../../components/containers/rooms/ActiveRoom";
import { selectUser } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { joinRoom } from "../../socket/options";
import { getSocket, selectSocket, setSocket } from "../../redux/slices/socketSlice";

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

function room() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);
    const socketInfo = useSelector(selectSocket);

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
        const socket = getSocket();

        if(!socketInfo.connected || !socket){
            dispatch(setSocket("http://localhost:5000"));
        }else{
            if(userInfo.info){
                joinRoom(id, userInfo.info);

                socket.on("getRoomUsers", (users: User[]) => {
                    dispatch(setRoomUsers(users));
                });

                socket.on("recieveMessage", (messages: Message[]) => {
                    const roomMessages = messages.filter((message) => message.roomID === id);
                    dispatch(setRoomMessages(messages));
                });
            }
        }
    }, [id, userInfo.info, socketInfo.connected]);

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
