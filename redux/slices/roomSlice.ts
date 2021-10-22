import { createSlice } from "@reduxjs/toolkit";

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
}

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

interface State{
    rooms: Room[] | null;
    activeRoom: Room | null;
    roomUsers: User[] | null;
    messages: Message[];
}

const initialState: State = {
    rooms: null,
    activeRoom: null,
    roomUsers: null,
    messages: [],
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setActiveRoom: (state, action) => {
            state.activeRoom = action.payload;
        },
        setRoomUsers: (state, action) => {
            state.roomUsers = action.payload;
        },
        setRoomMessages: (state, action) => {
            state.messages = action.payload;
        },
        addRoom: (state, action) => {
            if(state.rooms){
                if(state.rooms.some((r) => r.admin !== action.payload.admin)){
                    state.rooms.push(action.payload);
                }
            }else{
                state.rooms = [action.payload];
            }
        },
    },
});

export const { 
    setRooms,
    setActiveRoom,
    setRoomUsers,
    setRoomMessages,
    addRoom
} = roomSlice.actions;

export const selectRooms = (state: any) => state.room;

export default roomSlice.reducer;