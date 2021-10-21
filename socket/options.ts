import axios from "axios";
import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "../redux/slices/socketSlice";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
}

const connectToSocket = (userInfo: User | null, dispatch: any) => {
    dispatch(setSocket("/api/socket.io"));

    if(userInfo){
        axios.get("/api/socket.io").finally(() => {
            const socket = io();
    
            socket.emit("addUser", userInfo._id);
    
            socket.on("getUsers", (users) => {
                dispatch(setOnlineUsers(users));
            });
        });
    }
}

const createRoom = (roomName: string, totalStages: number, maxPlayers: number, isPrivate: boolean, userInfo: User | null, dispatch: any) => {
    if(userInfo){
        axios.get("/api/socket.io").finally(() => {
            const socket = io();

            const data: Room = {
                roomName: roomName,
                totalStages: totalStages,
                maxPlayers: maxPlayers,
                isPrivate: isPrivate,
                hasStarted: false,
                admin: userInfo._id,
            };
    
            socket.emit("addRoom", data);
    
            socket.on("getRooms", (rooms) => {
                console.log(rooms)
            });
        });
    }
}

export {connectToSocket, createRoom};