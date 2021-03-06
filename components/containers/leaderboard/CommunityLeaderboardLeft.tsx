import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCommunity } from '../../../redux/slices/communitySlice';
import { selectUser } from '../../../redux/slices/userSlice';

interface LeaderboardUser{
    username: string;
    points: number;
}

function CommunityLeaderboardLeft() {
    const userInfo = useSelector(selectUser);
    const communityInfo = useSelector(selectCommunity);

    const [userInLeaderboard, setUserInLeaderboard] = useState<number | null>(null);

    useEffect(() => {
        if(userInfo.info && communityInfo.users && communityInfo.leaderboardUsers){
            let foundUser = communityInfo.leaderboardUsers.find((user: LeaderboardUser) => user.username === userInfo.info.username);
            let sortedUsers = null;

            if(foundUser){
                sortedUsers = [...communityInfo.leaderboardUsers].sort((a: LeaderboardUser, b: LeaderboardUser) => (b.points - a.points));
            }

            if(sortedUsers){
                let userIndex = sortedUsers.indexOf(foundUser)

                setUserInLeaderboard(userIndex + 1)
            }
        }
    }, [userInfo.info, communityInfo.users, communityInfo.leaderboardUsers]);

    if(!userInfo.info || !communityInfo.users || !communityInfo.leaderboardUsers || communityInfo.users.length > communityInfo.leaderboardUsers.length){
        return null;
    }

    return (
        <div className="communityPage__container__leaderboard__left">
            <h2>{userInfo.info.username}</h2>
            <h3>Place: {userInLeaderboard}</h3>
            <h3>Points: {userInfo.info.level + userInfo.info.passedLevels.length}</h3>
        </div>
    )
}

export default CommunityLeaderboardLeft
