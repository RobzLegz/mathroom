import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../redux/slices/communitySlice';
import { getCommunityLevels } from '../../../requests/community/levels/requests';

function CommunityPageLevels() {
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!communityInfo.levels){
            getCommunityLevels(dispatch);
        }
    }, [communityInfo.levels]);

    return (
        <div>
            
        </div>
    )
}

export default CommunityPageLevels
