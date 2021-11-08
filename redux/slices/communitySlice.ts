import { createSlice } from "@reduxjs/toolkit";

interface Level{
    instruction: string;
    correctValue: number;
    accepted: boolean;
    _id: string;
    difficulty: number;
    question: string;
    author: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface User{
    username: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
    completedLevels: string[];
    userLevels: Level[] | null | undefined;
}

interface State{
    levels: null | Level[];
    activeLevel: null | Level;
    showCompletedLevels: boolean;
    difficulty: null | number;
    users: null | User[];
    activeProfile: null | User;
    searchQuery: string;
    leaderboardUsers: null | User[];
}

const initialState: State = {
    levels: null,
    activeLevel: null,
    showCompletedLevels: false,
    difficulty: null,
    users: null,
    activeProfile : null,
    searchQuery: "",
    leaderboardUsers: null
}

export const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        setLevels: (state, action) => {
            state.levels = action.payload;
        },
        setActiveLevel: (state, action) => {
            state.activeLevel = action.payload;
        },
        resetActiveLevel: (state) => {
            state.activeLevel = null;
        },
        completedLevelsSwitch: (state) => {
            state.showCompletedLevels = !state.showCompletedLevels;
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setActiveProfile: (state, action) => {
            state.activeProfile = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        pushLeaderboardUser: (state, action) => {
            if(state.leaderboardUsers && state.leaderboardUsers.length > 0){
                state.leaderboardUsers.push(action.payload);
            }else if(!state.leaderboardUsers){
                state.leaderboardUsers = [action.payload];
            }
        },
    },
});

export const {
    setLevels,
    setActiveLevel,
    completedLevelsSwitch,
    resetActiveLevel,
    setDifficulty,
    setActiveProfile,
    pushLeaderboardUser,
    setSearchQuery,
    setUsers
} = communitySlice.actions;

export const selectCommunity = (state: any) => state.community;

export default communitySlice.reducer;