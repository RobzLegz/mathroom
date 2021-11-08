import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../../redux/slices/communitySlice';
import { getAllUsers } from '../../../../requests/user/requests';
import CommunityLeaderboardLeft from '../../leaderboard/CommunityLeaderboardLeft';
import CommunityLeaderboardRight from '../../leaderboard/CommunityLeaderboardRight';

function LeaderboardContainer() {
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!communityInfo.users){
            getAllUsers(dispatch);
        }
    }, [communityInfo.users, dispatch]);

    return (
        <div className="communityPage__container__leaderboard">
            <CommunityLeaderboardLeft />
            <CommunityLeaderboardRight />
        </div>
    )
}

export default LeaderboardContainer
