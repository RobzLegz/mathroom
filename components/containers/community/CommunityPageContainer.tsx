import React from 'react'
import CommunityContainerHeader from './CommunityContainerHeader';
import CommunityPageLevels from './CommunityPageLevels';

interface Props{
    page: string;
}

const CommunityPageContainer: React.FC<Props> = ({page}) => {

    if(page === "home"){
        return (
            <div className="communityPage__container">
                <CommunityContainerHeader page={page} />
                <CommunityPageLevels />
            </div>
        )
    }else if(page === "leaderboard"){
        return (
            <div className="communityPage__container">
                <CommunityContainerHeader page={page} />
            </div>
        )
    }else if(page === "search"){
        return (
            <div className="communityPage__container">
                <CommunityContainerHeader page={page} />
            </div>
        )
    }
    return null;
}

export default CommunityPageContainer
