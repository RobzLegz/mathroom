import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { completedLevelsSwitch, selectCommunity, setDifficulty } from '../../../../redux/slices/communitySlice';

function LevelContainerHeader() {
    const communityInfo = useSelector(selectCommunity);

    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <header className="communityPage__container__levels__header">
            <div className="communityPage__container__levels__header__showCompletedLevels">
                <div className={`auth__container__form__privacyPolicy__checkbox ${communityInfo.showCompletedLevels ? "auth__container__form__privacyPolicy__checkbox__agreed" : ""}`} onClick={() => dispatch(completedLevelsSwitch())}>{communityInfo.showCompletedLevels && (<img src="/png/white-check-mark.png" alt="white check mark" />)}</div>
                <p>Show completed levels</p>
            </div>
            <div className="communityPage__container__levels__header__chooseDifficulty">
                <p>Choose difficulty</p>
                <div className="communityPage__container__levels__header__chooseDifficulty__options">
                    <button onClick={() => dispatch(setDifficulty(0))}>easy</button>
                    <button onClick={() => dispatch(setDifficulty(1))}>medium</button>
                    <button onClick={() => dispatch(setDifficulty(2))}>hard</button>
                </div>
                <button onClick={() => dispatch(setDifficulty(null))}>all</button>
            </div>
            <button className="communityPage__container__levels__header__createNew" onClick={() => router.push("/community/levels/new")}>Create new</button>
        </header>
    )
}

export default LevelContainerHeader
