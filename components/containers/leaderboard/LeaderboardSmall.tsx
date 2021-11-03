import React, { useEffect, useState } from 'react'
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

    const [leaders, setLeaders] = useState<RoomUser[] | null>(null);

    useEffect(() => {
        if(roomInfo && roomInfo.roomUsers){
            setLeaders([...roomInfo.roomUsers].sort((a: RoomUser, b: RoomUser) => {return b.points-a.points}))
        }
    }, [roomInfo.roomUsers, roomInfo]);

    if(!leaders){
        return null;
    }

    return (
        <div className="leaderboardSmall">
            {
                leaders
                    .map((object: RoomUser, i: number) => (
                        <div className="leaderboardSmall__object" key={i}>
                            <h4>#{i + 1}</h4>
                            <strong>{object.username}</strong>
                            <div className="leaderboardSmall__object__points">
                                
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default LeaderboardSmall
