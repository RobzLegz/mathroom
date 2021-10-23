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
            const socketURL: string | undefined = process.env.SOCKET_URL;

            if(action.payload && socketURL){
                socket = io(socketURL);
                state.connected = true;
            }else if(action.payload){
                socket = io("https://mathroom-socket.herokuapp.com");
                state.connected = true;
            }
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