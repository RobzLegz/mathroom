import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectRooms } from "../../../redux/slices/roomSlice";
import GameRoom from "./state/GameRoom";
import WaitingRoom from "./state/WaitingRoom";

function ActiveRoom() {
    const roomInfo = useSelector(selectRooms);

    const [waiting, setWaiting] = useState(null);

    useEffect(() => {
        if(roomInfo.activeRoom && waiting === null){
            setWaiting(roomInfo.activeRoom.hasStarted);
        }
    }, [roomInfo.activeRoom, waiting]);


    if(waiting === true){
        return <WaitingRoom />
    }else if(waiting === false){
        return <GameRoom />
    }

    return null;
}

export default ActiveRoom