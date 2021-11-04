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
            <div className={`communityPage__container__header__link ${page === "home" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community")}>
                <p>Levels</p>
            </div>

            <div className={`communityPage__container__header__link ${page === "leaderboard" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/leaderboard")}>
                <p>Leaderboard</p>
            </div>

            <div className={`communityPage__container__header__link ${page === "search" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/search")}>
                <p>Search</p>
            </div>

            {userInfo.info.role === "admin" && (
                <div className={`communityPage__container__header__link ${page === "admin" ? "communityPage__container__header__link__active" : ""}`} onClick={() => router.push("/community/admin")}>
                    <p>Admin</p>
                </div>
            )}
        </nav>
    )
}

export default CommunityContainerHeader
