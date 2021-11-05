import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { checkForLogin } from '../../../requests/auth/requests';
import CommunityContainerHeader from './CommunityContainerHeader';
import CommunityPageLevels from './CommunityPageLevels';

interface Props{
    page: string;
}

const CommunityPageContainer: React.FC<Props> = ({page}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userInfo = useSelector(selectUser);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    if(!userInfo.info || !page){
        return null;
    }

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
    }else if (page === "admin"){
        return (
            <div className="communityPage__container">
                <CommunityContainerHeader page={page} />
                
            </div>
        )
    }
    
    return null;
}

export default CommunityPageContainer
