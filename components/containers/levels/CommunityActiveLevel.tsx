import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin } from '../../../redux/slices/adminSlice';
import { selectCommunity } from '../../../redux/slices/communitySlice';

function CommunityActiveLevel() {
    const adminInfo = useSelector(selectAdmin);
    const communityInfo = useSelector(selectCommunity);

    const dispatch = useDispatch();
    const router = useRouter();

    const [needHelp, setNeedHelp] = useState<boolean>(false);
    const [writing, setWriting] = useState<boolean>(false);
    const [enteredValue, setEnteredValue] = useState<number>(0);

    const completeLevel = (e: any) => {
        e.preventDefault();
    }

    if(!communityInfo.activeLevel){
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
                            <p></p>
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
                                max="40"
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
        </div>
    )
}

export default CommunityActiveLevel
