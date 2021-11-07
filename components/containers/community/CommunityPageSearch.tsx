import React from 'react'
import SearchContainerBody from './body/SearchContainerBody';
import SearchContainerHeader from './headers/SearchContainerHeader';

function CommunityPageSearch() {
    return (
        <div className="communityPage__container__search">
            <SearchContainerHeader />
            <SearchContainerBody />
        </div>
    )
}

export default CommunityPageSearch
