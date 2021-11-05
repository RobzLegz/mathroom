import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { completedLevelsSwitch, selectCommunity } from '../../../../redux/slices/communitySlice';

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
                    <button>easy</button>
                    <button>medium</button>
                    <button>hard</button>
                </div>
            </div>
            <button className="communityPage__container__levels__header__createNew" onClick={() => router.push("/community/levels/new")}>Create new</button>
        </header>
    )
}

export default LevelContainerHeader
