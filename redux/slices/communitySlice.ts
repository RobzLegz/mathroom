import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    levels: null,
    activeLevel: null,
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
    },
});

export const {
    setLevels,
    setActiveLevel,
} = communitySlice.actions;

export const selectCommunity = (state: any) => state.community;

export default communitySlice.reducer;