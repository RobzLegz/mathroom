import React from 'react'
import { useSelector } from 'react-redux';
import { selectRooms } from '../../../../redux/slices/roomSlice';
import { selectUser } from '../../../../redux/slices/userSlice';
import MultiplayerActiveLevel from '../../levels/MultiplayerActiveLevel';

interface RoomUser{
    username: string;
    level: number;
    points: number;
    userId: string;
}

function GameRoom() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);

    if(!userInfo.info || !roomInfo.roomUsers || !roomInfo.activeRoom){
        return null;
    }

    if(!roomInfo.roomUsers.some((user: RoomUser) => user.userId === userInfo.info._id)){
        return null;
    }

    if(roomInfo.roomUsers.find((user: RoomUser) => user.userId === userInfo.info._id).level > roomInfo.activeRoom.tasks.length){
        return null; //leaderboard will go here
    }

    return (
        <div className="level">
            <MultiplayerActiveLevel />
        </div>
    )
}

export default GameRoom
