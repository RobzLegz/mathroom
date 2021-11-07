import { createSlice } from "@reduxjs/toolkit";

interface Task{
    type: string;
}

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
    tasks: Task[];
    _id: string;
}

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    userId: string;
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
    removedIds: string[];
}

const initialState: State = {
    rooms: null,
    activeRoom: null,
    roomUsers: null,
    messages: [],
    removedIds: [],
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
                if(state.removedIds.includes(action.payload._id)){
                    return;
                }

                state.removedIds.forEach((id) => {
                    if(action.payload === id){
                        return;
                    }
                });

                state.rooms.forEach((room) => {
                    if(state.removedIds.includes(room._id)){
                        state.rooms?.filter((r) => r._id !== room._id);
                        state.rooms?.filter((r) => r !== room);
                    }
                });

                if(state.rooms.some((r) => r.admin !== action.payload.admin) && state.rooms.some((r) => r._id !== action.payload._id)){
                    state.rooms.push(action.payload);
                }else if(state.rooms.length === 0){
                    state.rooms.push(action.payload);
                }
            }else{
                state.rooms = [action.payload];
            }
        },
        removeRoom: (state, action) => {
            if(!state.removedIds.includes(action.payload)){
                state.removedIds.push(action.payload);
            }

            if(state.rooms){
                state.rooms.forEach((room) => {
                    if(state.removedIds.includes(room._id)){
                        state.rooms?.filter((r) => r._id !== room._id);
                        state.rooms?.filter((r) => r !== room);
                    }
                });

                state.rooms = state.rooms.filter((room) => room._id !== action.payload);
                state.rooms.filter((room) => room._id !== action.payload);
            }
        },
        startGame: (state, action) => {
            if(!state.removedIds.includes(action.payload)){
                state.removedIds.push(action.payload);
            }

            if(state.rooms){
                let startRoom = state.rooms.find((room) => room._id === action.payload);

                if(startRoom){
                    startRoom.hasStarted = true;
                }

                state.rooms.forEach((room) => {
                    if(state.removedIds.includes(room._id)){
                        state.rooms?.filter((r) => r._id !== room._id);
                        state.rooms?.filter((r) => r !== room);
                    }
                });

                state.rooms = state.rooms.filter((room) => room._id !== action.payload);
                state.rooms.filter((room) => room._id !== action.payload);
            }
            if(state.activeRoom){
                if(state.activeRoom._id === action.payload){
                    state.activeRoom.hasStarted = true;
                }
            }
        },
    },
});

export const {
    setRooms,
    setActiveRoom,
    setRoomUsers,
    setRoomMessages,
    removeRoom,
    addRoom,
    startGame
} = roomSlice.actions;

export const selectRooms = (state: any) => state.room;

export default roomSlice.reducer;