import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DisplayMultiplayerTask from '../../../hooks/DisplayMultiplayerTask';
import { selectUser } from '../../../redux/slices/userSlice';
import { exitRoom } from '../../../requests/rooms/requests';
import LeaderboardSmall from '../leaderboard/LeaderboardSmall';

function MultiplayerActiveLevel() {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const [needHelp, setNeedHelp] = useState<boolean>(false);

    return (
        <div className="activeLevel activeLevelMultiplayer">
            <LeaderboardSmall />

            <header className="activeLevel__header">
                <button className="button" onClick={() => exitRoom(userInfo.info, dispatch, router)}>Exit</button>
                <button className="button" onClick={() => setNeedHelp(!needHelp)}>help?</button>
            </header>

            <DisplayMultiplayerTask needHelp={needHelp} setNeedHelp={setNeedHelp} />
        </div>
    )
}

export default MultiplayerActiveLevel
