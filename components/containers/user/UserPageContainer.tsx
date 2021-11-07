import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../redux/slices/communitySlice';
import { getUserInfoByUsername } from '../../../requests/user/requests';

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

function UserPageContainer() {
    const communityInfo = useSelector(selectCommunity);

    const router = useRouter();
    const dispatch = useDispatch();

    const {username} = router.query;

    useEffect(() => {
        if(!communityInfo.activeProfile){
            return getUserInfoByUsername(username, dispatch);
        }

        if(username === communityInfo.activeProfile.username){
            return;
        }

        getUserInfoByUsername(username, dispatch);
    }, [username]);

    if(!communityInfo.activeProfile){
        return null;
    }

    return (
        <div className="profilePage__container">
            <div className="profilePage__container__header">
                <button onClick={() => router.back()}>Back</button>
                <h1>Profile</h1>
            </div>
            <div className="profilePage__container__top">
                <h2>{communityInfo.activeProfile.username}</h2>
                <h3>Points: {communityInfo.activeProfile.level + communityInfo.activeProfile.passedLevels.length}</h3>
            </div>
            {communityInfo.activeProfile.userLevels.length > 0 && (
                <div className="profilePage__container__bottom">
                    <h3>Levels created by {communityInfo.activeProfile.username}:</h3>
                    <div className="profilePage__container__bottom__levels">
                        {
                            communityInfo.activeProfile.userLevels.map((level: Level, i: number) => {
                                if(level.accepted){
                                    return (
                                        <div className="profilePage__container__bottom__levels__level" key={i} onClick={() => router.push(`/community/levels/${level._id}`)}>
                                            <img src={level.image} alt={`Mathroom community task ${level.question}`} />
                                            <div className="profilePage__container__bottom__levels__level__overlay">
                                                <img src={level.difficulty === 0 ? "/svg/happyFace.svg" : level.difficulty === 1 ? "/svg/confusedFace.svg" : "/svg/angryFace.svg"} alt="Mathroom level difficulty symbol" />
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPageContainer
