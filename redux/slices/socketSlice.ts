import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socket: any = null;

export const getSocket = () => {
    return socket;
}

interface User{
    userId: string;
    socketId: string;
}

interface State{
    connected: boolean;
    onlineUsers: null | User[];
}

const initialState: State = {
    connected: false,
    onlineUsers: null,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            socket = io(action.payload);
            state.connected = true;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const { 
    setSocket,
    setOnlineUsers
} = socketSlice.actions;

export const selectSocket = (state: any) => state.socket;

export default socketSlice.reducer;