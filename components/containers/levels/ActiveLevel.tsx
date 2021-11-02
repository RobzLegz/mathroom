import { useRouter } from 'next/dist/client/router';
import React from 'react'
import DisplayLevelFromType from '../../../hooks/DisplayLevelFromType';

function ActiveLevel() {
    const router = useRouter();

    const {level} = router.query;

    return (
        <div className="activeLevel">
            <header className="activeLevel__header">
                <button className="button" onClick={() => router.push("/menu")}>Main menu</button>
                <h2>Level {level}</h2>
                <button className="button">help?</button>
            </header>

            <DisplayLevelFromType />
        </div>
    )
}

export default ActiveLevel
