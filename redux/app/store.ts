import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import notificationReducer from "../slices/notificationSlice";
import roomReducer from "../slices/roomSlice";
import socketReducer from "../slices/socketSlice";
import communityReducer from "../slices/communitySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationReducer,
        room: roomReducer,
        socket: socketReducer,
        community: communityReducer
    },
});