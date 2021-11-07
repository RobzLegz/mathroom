import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity, setSearchQuery } from '../../../../redux/slices/communitySlice';

function SearchContainerHeader() {
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();

    return (
        <header className="communityPage__container__search__header">
            <input
                type="text"
                name="search_query"
                id="search_query"
                placeholder="search"
                value={communityInfo.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(String(e.target.value)))}
            />
            <button>Search</button>
        </header>
    )
}

export default SearchContainerHeader
