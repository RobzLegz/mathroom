import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectCommunity } from '../../../../redux/slices/communitySlice';
import { selectUser } from '../../../../redux/slices/userSlice';

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

function LevelContainerBody() {
    const communityInfo = useSelector(selectCommunity);
    const userInfo = useSelector(selectUser);

    const router = useRouter();

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
            {communityInfo.levels.map((level: Level, i: number) => {
                if(communityInfo.difficulty && communityInfo.difficulty !== level.difficulty){
                    return null;
                }

                if(!communityInfo.showCompletedLevels && userInfo.info.passedLevels.includes(level._id)){
                    return null;
                }

                if(communityInfo.difficulty === 0 && level.difficulty !== 0){
                    return null;
                }

                return (
                    <div className={`communityPage__container__levels__body__taskContainer ${userInfo.info.passedLevels.includes(level._id) ? "communityPage__container__levels__body__taskContainer__passed" : ""}`} key={i} onClick={() => router.push(`/community/levels/${level._id}`)}>
                        <img src={level.image} alt={`Mathroom community task ${level.question}`} />
                        <div className="communityPage__container__levels__body__taskContainer__overlay">
                            <img src={level.difficulty === 0 ? "/svg/happyFace.svg" : level.difficulty === 1 ? "/svg/confusedFace.svg" : "/svg/angryFace.svg"} alt="Mathroom level difficulty symbol" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default LevelContainerBody
