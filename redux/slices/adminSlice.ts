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
}

const initialState: State = {
    levels: null,
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUnreviewedLevels: (state, action) => {
            state.levels = action.payload;
        },
    },
});

export const {
    setUnreviewedLevels,
} = adminSlice.actions;

export const selectAdmin = (state: any) => state.admin;

export default adminSlice.reducer;