import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addRoom, selectRooms } from "../../../redux/slices/roomSlice";
import { getSocket, selectSocket, setSocket } from "../../../redux/slices/socketSlice";

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
    _id: string;
}

const RoomContainer: React.FC = () => {
    const roomInfo = useSelector(selectRooms);
    const socketInfo = useSelector(selectSocket);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const socket = getSocket();
        console.log(process.env.SOCKET_URL)

        if(!socketInfo.connected || !socket){
            dispatch(setSocket(true));
        }else{
            socket.on("getRooms", (rooms: Room[]) => {
                console.log(rooms);
                rooms.forEach((room) => {
                    dispatch(addRoom(room));
                });
            });
        }
    }, [socketInfo.connected, dispatch]);

    return (
        <div className="roomPage__container">
            {
                roomInfo.rooms && roomInfo.rooms.map((room: Room, i: number) => {
                    return(
                        <div className="roomPage__container__room" key={i}>
                            <h3>{room.roomName}</h3>
                            <h3>total stages: {room.totalStages}</h3>
                            <h3>max players: {room.maxPlayers}</h3>
                            <button onClick={() => router.push(`/rooms/${room._id}`)}>Join</button>
                        </div>
                    ) 
                })
            }
        </div>
    )
}

export default RoomContainer
