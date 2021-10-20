import { createSlice } from "@reduxjs/toolkit";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
}

interface State{
    loggedIn: boolean;
    token: string;
    info: null | User;
}

const initialState: State = {
    loggedIn: false,
    token: "",
    info: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        setUserInfo: (state, action) => {
            state.info = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { 
    login,
    setUserInfo,
    setToken,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;