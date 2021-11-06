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

interface State{
    levels: null | Level[];
    activeLevel: null | Level;
    showCompletedLevels: boolean;
    difficulty: null | number;
}

const initialState: State = {
    levels: null,
    activeLevel: null,
    showCompletedLevels: false,
    difficulty: null,
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
    },
});

export const {
    setLevels,
    setActiveLevel,
    completedLevelsSwitch,
    resetActiveLevel,
    setDifficulty
} = communitySlice.actions;

export const selectCommunity = (state: any) => state.community;

export default communitySlice.reducer;