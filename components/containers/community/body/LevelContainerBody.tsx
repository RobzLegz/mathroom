import React from 'react'
import { useSelector } from 'react-redux';
import { selectCommunity } from '../../../../redux/slices/communitySlice';

function LevelContainerBody() {
    const communityInfo = useSelector(selectCommunity);

    if(!communityInfo.levels){
        return (
            <div className="communityPage__container__levels__body">
                <div className="communityPage__container__levels__body__message">
                    <strong>Loading community levels</strong>
                </div>
            </div>
        )
    }else if(communityInfo.levels.length === 0){
        return (
            <div className="communityPage__container__levels__body">
                <div className="communityPage__container__levels__body__message">
                    <strong>Searching for levels...</strong>
                    <p>You can create Your own level</p>
                </div>
            </div>
        )
    }

    return (
        <div className="communityPage__container__levels__body">
            
        </div>
    )
}

export default LevelContainerBody
