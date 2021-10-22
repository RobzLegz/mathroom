import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux";
import { getRoomInfo } from "../../requests/rooms/requests";
import { useRouter } from "next/dist/client/router";
import { selectRooms, setRoomMessages, setRoomUsers } from "../../redux/slices/roomSlice";
import ActiveRoom from "../../components/containers/rooms/ActiveRoom";
import { selectUser } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { joinRoom } from "../../socket/options";
import io from "socket.io-client";
import axios from "axios";

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

function room() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);
    const [testSocket] = useState(io("/api/socket.io"));

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

    useEffect(() => {
        axios.get("/api/socket.io")
            .finally(() => {
                const socket = io();
        
                socket.on("getRoomUsers", (users) => {
                    dispatch(setRoomUsers(users));
                });

                socket.on("recieveMessage", (messages: Message[]) => {
                    console.log(messages);
                    console.log(router.query.id);
                    const roomMessages = messages.filter((message) => message.roomID === id);
                    console.log(roomMessages);
                    dispatch(setRoomMessages(messages));
                });
            });
    }, [io]);

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
