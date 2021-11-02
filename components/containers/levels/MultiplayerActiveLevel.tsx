import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import DisplayMultiplayerTask from '../../../hooks/DisplayMultiplayerTask';

function MultiplayerActiveLevel() {
    const router = useRouter();

    const [needHelp, setNeedHelp] = useState<boolean>(false);

    return (
        <div className="activeLevel">
            <header className="activeLevel__header">
                <button className="button" onClick={() => router.push("/levels")}>Exit</button>
                <button className="button" onClick={() => setNeedHelp(!needHelp)}>help?</button>
            </header>

            <DisplayMultiplayerTask needHelp={needHelp} setNeedHelp={setNeedHelp} />
        </div>
    )
}

export default MultiplayerActiveLevel
