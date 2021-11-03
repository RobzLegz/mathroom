import React from 'react'
import { useSelector } from 'react-redux';
import { selectRooms } from '../../../redux/slices/roomSlice';

interface RoomUser{
    username: string;
    level: number;
    points: number;
    userId: string;
}



const Leaderboard: React.FC = () => {
    const roomInfo = useSelector(selectRooms);

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            {
                [...roomInfo.roomUsers].sort((a: RoomUser, b: RoomUser) => {return b.points-a.points})
                    .map((object: RoomUser, i: number) => (
                        <div className={`leaderboard__object leaderboard__object__${object.level <= roomInfo.activeRoom.tasks.length ? "playing" : "done"}`} key={i}>
                            <h4>#{i + 1}</h4>
                            <strong>{object.username}</strong>
                            <div className="leaderboard__object__points">
                                <h4>{object.points}</h4>
                                <img src="/png/coin.png" alt="yellow coin with star design on it" />
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Leaderboard
