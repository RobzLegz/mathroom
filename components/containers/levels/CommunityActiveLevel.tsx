import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunity } from '../../../redux/slices/communitySlice';
import { selectUser } from '../../../redux/slices/userSlice';
import { acceptCommunityLevel } from '../../../requests/admin/requests';
import { checkForLogin } from '../../../requests/auth/requests';

function CommunityActiveLevel() {
    const userInfo = useSelector(selectUser);
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();
    const router = useRouter();

    const [needHelp, setNeedHelp] = useState<boolean>(false);
    const [writing, setWriting] = useState<boolean>(false);
    const [enteredValue, setEnteredValue] = useState<number>(0);

    const {id} = router.query;

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    const completeLevel = (e: any) => {
        e.preventDefault();
    }

    if(!communityInfo.activeLevel || !userInfo.info){
        return null;
    }

    return (
        <div className="communityLevelPage__container">
            <header className="communityLevelPage__container__header">
                <button className="button" onClick={() => router.push("/community")}>Exit</button>
                <button className="button" onClick={() => setNeedHelp(!needHelp)}>help?</button>
            </header>

            {needHelp && (
                <div className="communityLevelPage__container__tip">
                    <div className="communityLevelPage__container__tip__inner">
                        <div className="communityLevelPage__container__tip__inner__close" onClick={() => setNeedHelp(false)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                        </div>
                        <div className="communityLevelPage__container__tip__inner__text">
                            <p>{communityInfo.activeLevel.instruction}</p>
                        </div>
                        <div className="buttonContainer">
                            <button onClick={() => setNeedHelp(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="communityLevelPage__container__task">
                <strong>{communityInfo.activeLevel.question}</strong>
            </div>

            <div className="communityLevelPage__container__options">
                <div className="communityLevelPage__container__options__tools">
                    <div className="inputContainer">
                        {writing ? (
                            <input
                                type="number"
                                value={enteredValue.toString()}
                                onChange={(e) => {if(e.target.value.length > 3){return}setEnteredValue(Number(e.target.value))}}
                            />
                        ) : (
                            <input
                                type="range"
                                value={enteredValue}
                                onChange={(e) => setEnteredValue(Number(e.target.value))}
                                min="0"
                                max={communityInfo.activeLevel.correctValue + Math.floor((Math.random() * 30) + 20)}
                            />
                        )}
                        <strong onClick={() => setWriting(!writing)}>{enteredValue}</strong>
                    </div>
                    <div className="communityLevelPage__container__options__tools__instruction">
                        <small>Slide from left to right to change value or click the number next to it to write result</small>
                    </div>
                    <button className="communityLevelPage__container__options__tools__submit" onClick={(e) => completeLevel(e)}>Submit</button>
                </div>
                <div className="communityLevelPage__container__options__ilustration">
                    <img src="/levels/pool.svg" alt="water flowing in a green pool" />
                </div>
            </div>

            {userInfo.info.role === "admin" ? (
                <div className="communityLevelPage__container__footer">
                    <button className="accept" onClick={() => acceptCommunityLevel(id, userInfo.token, dispatch, router)}>Accept</button>
                    <button className="update">Edit</button>
                    <button className="reject">Delete</button>
                </div>  
            ) : (
                null
            )}
        </div>
    )
}

export default CommunityActiveLevel
