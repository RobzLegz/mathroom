import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../redux/slices/notificationSlice";
import { addRoom, removeRoom, selectRooms, setActiveRoom, setRooms, setRoomUsers, startGame } from "../../../redux/slices/roomSlice";
import { getSocket, selectSocket, setSocket } from "../../../redux/slices/socketSlice";
import { selectUser } from "../../../redux/slices/userSlice";
import { getRooms } from "../../../requests/rooms/requests";

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
    _id: string;
}

interface User{
    userId: string;
    socketId: string;
    roomId: string;
    username: string;
}

const RoomContainer: React.FC = () => {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);
    const socketInfo = useSelector(selectSocket);

    const dispatch = useDispatch();
    const router = useRouter();

    const [resetRooms, setResetRooms] = useState(false);
    const [removedRoomIds] = useState<string[]>([]);

    useEffect(() => {
        const socket = getSocket();

        if(socket){
            socket.emit("requestUsers");
            socket.emit("leaveRoom");
        }
    }, [getSocket()]);

    useEffect(() => {
        if(roomInfo.activeRoom){
            dispatch(setActiveRoom(null));
        }
    }, [roomInfo.activeRoom, dispatch]);

    useEffect(() => {
        if(roomInfo.rooms && resetRooms){
            const socket = getSocket();

            if(!socketInfo.connected || !socket){
                dispatch(setSocket(true));
            }else{
                socket.on("getRooms", (rooms: Room[]) => {
                    rooms.forEach((room) => {
                        dispatch(addRoom(room));
                    });
                });

                socket.on("removeRoom", (roomId: string) => {
                    dispatch(removeRoom(roomId));
                    if(!removedRoomIds.includes(roomId)){
                        removedRoomIds.push(roomId);
                    }
                });

                socket.on("startedGame", (roomId: string) => {
                    dispatch(startGame(roomId));
                    if(!removedRoomIds.includes(roomId)){
                        removedRoomIds.push(roomId);
                    }
                });

                socket.on("getRoomUsers", (users: User[]) => {
                    dispatch(setRoomUsers(users));
                });
            }
        }else if(!resetRooms){
            dispatch(setRooms(null));
            setResetRooms(true);
        }else if(!roomInfo.rooms){
            getRooms(dispatch);
        }
    }, [socketInfo.connected, dispatch, roomInfo.rooms, resetRooms, getSocket(), removedRoomIds]);

    return (
        <div className="roomPage__container">
            <header className="roomPage__container__header">
                <button className="roomPage__container__header__back" onClick={() => router.push("/menu")}>Back</button>
                <div className="roomPage__container__header__title">
                    <h2>Join room</h2>
                </div>
                <button className="roomPage__container__header__new" onClick={() => router.push("/rooms/new")}>Create new</button>
            </header>

            <div className="roomPage__container__rooms">
                {roomInfo.rooms && roomInfo.rooms.length > 0 && roomInfo.roomUsers ? roomInfo.rooms.map((room: Room, i: number) => {
                    if(room.hasStarted){
                        return null;
                    }

                    if(removedRoomIds.length > 0 && removedRoomIds.some((ri: string) => ri === room._id)){
                        return null;
                    }
                    
                    return(
                        <div className="roomPage__container__rooms__room" key={i}>
                            <h3>{room.roomName}</h3>
                            <h3>{room.totalStages}</h3>
                            <h3>{roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length}/{room.maxPlayers}</h3>
                            <button
                                className={`${roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length === room.maxPlayers ? "full" : "aviable"}`}
                                onClick={() => {
                                    if(!userInfo.loggedIn || !userInfo.token){
                                        return dispatch(setNotification({type: "error", message: "You must be logged in to join room"}))
                                    }else if(roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length < room.maxPlayers){
                                        router.push(`/rooms/${room._id}`);
                                    }}
                                }
                            >
                                Join
                            </button>
                        </div>
                    )
                }) : (
                    <div className="roomPage__container__rooms__no">
                        <h3>Searching for rooms...</h3>
                        <p>You can create Your own room</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoomContainer