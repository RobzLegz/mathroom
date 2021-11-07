import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';

interface Props{
    page: string;
}

const CommunityContainerHeader: React.FC<Props> = ({page}) => {
    const userInfo = useSelector(selectUser);

    const router = useRouter();

    return (
        <nav className="communityPage__container__header">
            <div className="communityPage__container__header__link" onClick={() => router.push("/menu")}>
                <p>Menu</p>
                <img src="/headers/menu.svg" alt="burger menu" />
            </div>

            <div className={`communityPage__container__header__link ${page === "home" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community")}>
                <p>Levels</p>
                <img src="/headers/levels.svg" alt="calculator" />
            </div>

            <div className={`communityPage__container__header__link ${page === "leaderboard" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/leaderboard")}>
                <p>Leaderboard</p>
                <img src="/headers/leaderboard.svg" alt="list" />
            </div>

            <div className={`communityPage__container__header__link ${page === "search" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/search")}>
                <p>Search</p>
                <img src="/headers/search.svg" alt="search" />
            </div>

            {userInfo.info.role === "admin" && (
                <div className={`communityPage__container__header__link ${page === "admin" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/admin")}>
                    <p>Admin</p>
                    <img src="/headers/admin.svg" alt="secure" />
                </div>
            )}
        </nav>
    )
}

export default CommunityContainerHeader
