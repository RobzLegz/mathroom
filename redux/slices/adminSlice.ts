import { createSlice } from "@reduxjs/toolkit";

interface State{
    levels: null | any;
    activeLevel: null | any;
}

const initialState: State = {
    levels: null,
    activeLevel: null,
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUnreviewedLevels: (state, action) => {
            state.levels = action.payload;
        },
        setActiveLevel: (state, action) => {
            state.activeLevel = action.payload;
        },
    },
});

export const {
    setUnreviewedLevels,
} = adminSlice.actions;

export const selectAdmin = (state: any) => state.admin;

export default adminSlice.reducer;