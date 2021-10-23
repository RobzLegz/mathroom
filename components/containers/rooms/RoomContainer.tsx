import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addRoom, selectRooms, setRooms, setRoomUsers } from "../../../redux/slices/roomSlice";
import { getSocket, selectSocket, setSocket } from "../../../redux/slices/socketSlice";
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
    const roomInfo = useSelector(selectRooms);
    const socketInfo = useSelector(selectSocket);

    const dispatch = useDispatch();
    const router = useRouter();

    const [resetRooms, setResetRooms] = useState(false);

    useEffect(() => {
        const socket = getSocket();

        if(socket){
            socket.emit("requestUsers");
        }
    }, [getSocket()]);

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
    }, [socketInfo.connected, dispatch, roomInfo.rooms, resetRooms, getSocket()]);

    return (
        <div className="roomPage__container">
            <header className="roomPage__container__header">
                <button className="roomPage__container__header__back" onClick={() => router.push("/")}>Back</button>
                <div className="roomPage__container__header__title">
                    <h2>Join room</h2>
                </div>
                <button className="roomPage__container__header__new" onClick={() => router.push("/rooms/new")}>Create new</button>
            </header>

            <div className="roomPage__container__rooms">
                {
                    roomInfo.rooms && roomInfo.roomUsers && roomInfo.rooms.map((room: Room, i: number) => {
                        return(
                            <div className="roomPage__container__rooms__room" key={i}>
                                <h3>{room.roomName}</h3>
                                <h3>{room.totalStages}</h3>
                                <h3>{roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length}/{room.maxPlayers}</h3>
                                <button className={`${roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length === room.maxPlayers ? "full" : "aviable"}`} onClick={() => {if(roomInfo.roomUsers.filter((u: User) => u.roomId === room._id).length < room.maxPlayers){router.push(`/rooms/${room._id}`)}}}>Join</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RoomContainer
