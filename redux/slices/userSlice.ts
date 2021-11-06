import { createSlice } from "@reduxjs/toolkit";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    passedLevels: string[];
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
        completeLevel: (state) => {
            if(state.info){
                state.info.level += 1;
            }
        },
        passCommunityLevelRedux: (state, action) => {
            if(state.info){
                state.info.passedLevels.push(action.payload);
            }
        },
        logout: (state) => {
            state.info = null;
            state.token = "";
            state.loggedIn = false;
        },
    },
});

export const {
    login,
    setUserInfo,
    setToken,
    completeLevel,
    passCommunityLevelRedux,
    logout
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;