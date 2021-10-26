import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectRooms } from "../../../redux/slices/roomSlice";
import GameRoom from "./state/GameRoom";
import WaitingRoom from "./state/WaitingRoom";

function ActiveRoom() {
    const roomInfo = useSelector(selectRooms);

    if(!roomInfo.activeRoom){
        return null;
    }

    if(roomInfo.activeRoom.hasStarted){
        return <GameRoom />
    }else if(!roomInfo.activeRoom.hasStarted){
        return <WaitingRoom />
    }

    return null;
}

export default ActiveRoom