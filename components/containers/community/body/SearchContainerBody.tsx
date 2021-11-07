import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../../redux/slices/communitySlice';
import { getAllUsers } from '../../../../requests/user/requests';

interface Level{
    instruction: string;
    correctValue: number;
    accepted: boolean;
    _id: string;
    difficulty: number;
    question: string;
    author: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface User{
    username: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
    completedLevels: string[];
    userLevels: Level[] | null | undefined;
}

function SearchContainerBody() {
    const communityInfo = useSelector(selectCommunity);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!communityInfo.users){
            getAllUsers(dispatch);
        }
    }, [communityInfo.users, dispatch]);

    if(!communityInfo.users){
        return null;
    }
    
    return (
        <div className="communityPage__container__search__body">
            {
                communityInfo.users.map((user: User, i: number) => {
                    if(communityInfo.searchQuery !== "" && communityInfo.searchQuery.toLowerCase() !== user.username.toLowerCase().substr(0, communityInfo.searchQuery.length)){
                        return null;
                    }

                    return(
                        <div className="communityPage__container__search__body__userContainer" key={i}>
                            <h3>{user.username}</h3>
                            <button onClick={() => router.push(`/community/user/${user.username}`)}><p className="big">View profile</p><p className="small">Visit</p></button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchContainerBody
