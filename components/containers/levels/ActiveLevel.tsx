import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import DisplayLevelFromType from '../../../hooks/DisplayLevelFromType';

function ActiveLevel() {
    const router = useRouter();

    const [lastLevel, setLastLevel] = useState<string | null>(null);
    const [needHelp, setNeedHelp] = useState<boolean>(false);

    const {level} = router.query;

    useEffect(() => {
        if(!lastLevel){
            setLastLevel(String(level));
        }

        if(lastLevel !== String(level)){
            setNeedHelp(false);
        }
    }, []);

    return (
        <div className="activeLevel">
            <header className="activeLevel__header">
                <button className="button" onClick={() => router.push("/levels")}>Exit</button>
                <h2>Level {level}</h2>
                <button className="button" onClick={() => setNeedHelp(!needHelp)}>help?</button>
            </header>

            <DisplayLevelFromType needHelp={needHelp} setNeedHelp={setNeedHelp} />
        </div>
    )
}

export default ActiveLevel
