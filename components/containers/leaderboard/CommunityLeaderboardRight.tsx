import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pushLeaderboardUser, selectCommunity } from '../../../redux/slices/communitySlice';
import { selectUser } from '../../../redux/slices/userSlice';

interface User{
    username: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
    passedLevels: string[];
}

interface LeaderboardUser{
    username: string;
    points: number;
}

function CommunityLeaderboardRight() {
    const userInfo = useSelector(selectUser);
    const communityInfo = useSelector(selectCommunity);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(communityInfo.users && !communityInfo.leaderboardUsers){
            communityInfo.users.forEach((user: User) => {
                let userPoints = user.level + user.passedLevels.length;

                let leaderboardData = {
                    username: user.username,
                    points: userPoints
                }

                dispatch(pushLeaderboardUser(leaderboardData));
            });
        }
    }, [communityInfo.users, communityInfo.leaderboardUsers]);

    if(!communityInfo.users || !communityInfo.leaderboardUsers || communityInfo.users.length > communityInfo.leaderboardUsers.length){
        return null;
    }

    return (
        <div className="communityPage__container__leaderboard__right">
            {
                [...communityInfo.leaderboardUsers]
                    .sort((a: LeaderboardUser, b: LeaderboardUser) => (b.points - a.points))
                    .map((user: LeaderboardUser, i: number) => {
                        return (
                            <div className={`communityPage__container__leaderboard__right__user ${user.username === userInfo.info.username ? "communityPage__container__leaderboard__right__user__my" : ""}`} key={i} onClick={() => router.push(`/community/user/${user.username}`)}>
                                <div className="communityPage__container__leaderboard__right__user__left">
                                    <h2>{i + 1}</h2>
                                    <h2>{user.username}</h2>
                                </div>
                                <div className="communityPage__container__leaderboard__right__user__points">
                                    <h3>{user.points}</h3>
                                    <img src="/png/coin.png" alt="coin with a star in the middle" />
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default CommunityLeaderboardRight
