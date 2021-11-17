import { useRouter } from 'next/dist/client/router';
import React from 'react'
import creditsList from '../../../data/credits';

function CreditContainer() {
    const router = useRouter();

    return (
        <div className="credits__container">
            <h1>Credits</h1>
            <button onClick={() => router.push("/menu")}>Back</button>

            {
                creditsList.map((credit, i: number) => {
                    return(
                        <div className="credits__container__credit" key={i}>
                            <img src={credit.image} alt={`Icon made by ${credit.author} from flaticon`} />
                            <h4>Icon made by <span>{credit.author}</span> from <a href="https://flaticon.com">www.flaticon.com</a></h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CreditContainer
