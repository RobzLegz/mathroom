import { createSlice } from "@reduxjs/toolkit";

interface State{
    levels: null | any;
    activeLevel: null | any;
    showCompletedLevels: boolean;
}

const initialState: State = {
    levels: null,
    activeLevel: null,
    showCompletedLevels: false,
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
        completedLevelsSwitch: (state) => {
            state.showCompletedLevels = !state.showCompletedLevels;
        },
    },
});

export const {
    setLevels,
    setActiveLevel,
    completedLevelsSwitch,
} = communitySlice.actions;

export const selectCommunity = (state: any) => state.community;

export default communitySlice.reducer;