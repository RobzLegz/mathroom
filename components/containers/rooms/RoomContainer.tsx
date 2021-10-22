import { useRouter } from "next/dist/client/router";
import React from "react"
import { useSelector } from "react-redux";
import { selectRooms } from "../../../redux/slices/roomSlice";

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

    const router = useRouter();

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
