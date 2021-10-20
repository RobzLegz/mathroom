import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import notificationReducer from "../slices/notificationSlice";
import languageReducer from "../slices/languageSlice";
import roomReducer from "../slices/roomSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationReducer,
        language: languageReducer,
        room: roomReducer,
    },
});