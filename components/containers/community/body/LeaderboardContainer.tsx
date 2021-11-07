import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../../redux/slices/communitySlice';
import { getAllUsers } from '../../../../requests/user/requests';

function LeaderboardContainer() {
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!communityInfo.users){
            getAllUsers(dispatch);
        }
    }, [communityInfo.users, dispatch]);

    return (
        <div>
            
        </div>
    )
}

export default LeaderboardContainer
