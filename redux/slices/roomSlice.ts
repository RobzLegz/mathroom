import { createSlice } from "@reduxjs/toolkit";

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
}

interface State{
    rooms: Room[] | null;
    activeRoom: Room | null;
}

const initialState: State = {
    rooms: null,
    activeRoom: null,
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
    addRoom
} = roomSlice.actions;

export const selectRooms = (state: any) => state.room;

export default roomSlice.reducer;