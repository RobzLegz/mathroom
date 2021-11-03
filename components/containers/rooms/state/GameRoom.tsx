import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectRooms } from '../../../../redux/slices/roomSlice';
import { selectUser } from '../../../../redux/slices/userSlice';
import { disbandRoom } from '../../../../requests/rooms/requests';
import Leaderboard from '../../leaderboard/Leaderboard';
import MultiplayerActiveLevel from '../../levels/MultiplayerActiveLevel';

interface RoomUser{
    username: string;
    level: number;
    points: number;
    userId: string;
}

function GameRoom() {
    const router = useRouter();
    const dispatch = useDispatch();

    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);

    if(!userInfo.info || !roomInfo.roomUsers || !roomInfo.activeRoom){
        return null;
    }

    if(!roomInfo.roomUsers.some((user: RoomUser) => user.userId === userInfo.info._id)){
        return null;
    }

    if(roomInfo.roomUsers.find((user: RoomUser) => user.userId === userInfo.info._id).level > roomInfo.activeRoom.tasks.length){
        return(
            <div className="gameRoom__active">
                <Leaderboard />
                {roomInfo.activeRoom.admin === userInfo.info._id ? (
                    <button className="gameRoom__active__disband" onClick={() => disbandRoom(roomInfo.activeRoom._id, userInfo.token, dispatch, router)}>Disband room</button>
                ) : (
                    null
                )}
            </div>
        )
    }

    return (
        <div className="level">
            <MultiplayerActiveLevel />
        </div>
    )
}

export default GameRoom
