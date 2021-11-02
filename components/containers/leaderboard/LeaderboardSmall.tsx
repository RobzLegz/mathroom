import React from 'react'
import { useSelector } from 'react-redux';
import { selectRooms } from '../../../redux/slices/roomSlice';

interface RoomUser{
    username: string;
    level: number;
    points: number;
    userId: string;
}



const LeaderboardSmall: React.FC = () => {
    const roomInfo = useSelector(selectRooms);

    return (
        <div className="leaderboardSmall">
            {
                roomInfo.roomUsers
                    .sort((a: RoomUser, b: RoomUser) => {return a.points - b.points})
                    .map((object: RoomUser, i: number) => (
                        <div className="leaderboardSmall__object" key={i}>
                            <h4>{i + 1}</h4>
                            <strong>{object.username}</strong>
                        </div>
                    ))
            }
        </div>
    )
}

export default LeaderboardSmall
