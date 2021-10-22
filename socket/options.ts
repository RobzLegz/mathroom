import axios from "axios";
import { io } from "socket.io-client";
import { addRoom } from "../redux/slices/roomSlice";
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

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
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
    
            socket.on("getRooms", (rooms: Room[]) => {
                console.log(rooms)
                rooms.forEach((room) => {
                    dispatch(addRoom(room));
                });
            });
        });
    }
}

const joinRoom = (roomId: string | string[] | undefined, userInfo: User) => {
    if(typeof(roomId) !== "string"){
        return
    }

    axios.get("/api/socket.io").finally(() => {
        const socket = io();

        socket.emit("joinRoom", userInfo._id, roomId);
    });
}

const sendSocketMessage = (message: Message) => {
    axios.get("/api/socket.io").finally(() => {
        const socket = io();

        socket.emit("sendMessage", message);
    });
}

export {connectToSocket, createRoom, sendSocketMessage, joinRoom};