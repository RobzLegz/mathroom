import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectRooms } from "../../../redux/slices/roomSlice";
import GameRoom from "./state/GameRoom";
import WaitingRoom from "./state/WaitingRoom";

function ActiveRoom() {
    const roomInfo = useSelector(selectRooms);

    const [started, setStarted] = useState(null);

    useEffect(() => {
        if(roomInfo.activeRoom && started === null){
            setStarted(roomInfo.activeRoom.hasStarted);
        }
    }, [roomInfo.activeRoom, started]);


    if(started === true){
        return <GameRoom />
    }else if(started === false){
        return <WaitingRoom />
    }

    return null;
}

export default ActiveRoom