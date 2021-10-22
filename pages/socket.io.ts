import { Server } from "socket.io"

interface User{
    userId: string;
    socketId: string;
}

interface RoomUser{
    userId: string;
    socketId: string;
    roomId: string;
    username: string;
}

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
    _id: string;
}

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

let users: User[] = [];
let roomUsers: RoomUser[] = [];
let rooms: Room[] = [];
let messages: Message[] = [];

const addUser = (userId: string, socketId: string) => {
    if(!users.some((user) => user.userId !== userId)){
        users.push({ userId, socketId });
    }else if(users.length === 0){
        users.push({ userId, socketId });
    }
};

const joinRoom = (userId: string, socketId: string, username: string, roomId: string) => {
    if(roomUsers.some((user) => user.userId !== userId)){
        roomUsers.push({ userId, socketId, roomId, username });
    }else if(roomUsers.length === 0){
        roomUsers.push({ userId, socketId, roomId, username });
    }
};

const leaveRoom = (socketId: string, userId: string) => {
    roomUsers = roomUsers.filter((user) => user.socketId !== socketId);
    roomUsers = roomUsers.filter((user) => user.userId !== userId);
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
    roomUsers = roomUsers.filter((user) => user.socketId !== socketId);
};

const addRoom = (data: Room) => {
    if(rooms.some((room) => room.admin !== data.admin)){
        rooms.push(data);
    }else if (rooms.length === 0){
        rooms.push(data);
    }else if(rooms.length > 0){
        rooms.filter((room) => room.admin !== data.admin);
    }
};

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};

const ioHandler = (req: any, res: any) => {
    if(!res.socket.server.io){
        const io = new Server(res.socket.server);

        io.on("connection", (socket) => {
            socket.on("addUser", (userId) => {
                addUser(userId, socket.id);
                io.emit("getUsers", users);
            });

            socket.on("joinRoom", (userId, username, roomId) => {
                joinRoom(userId, socket.id, username, roomId);
                io.emit("getRoomUsers", roomUsers);
            });

            socket.on("leaveRoom", (userId) => {
                leaveRoom(socket.id, userId);
                io.emit("getRoomUsers", roomUsers);
            });

            socket.on("addRoom", (data) => {
                addRoom(data);
                io.emit("getRooms", rooms);
            });

            socket.on("sendMessage", (message) => {
                messages.push(message);
                io.emit("recieveMessage", messages);
            })

            socket.on("disconnect", () => {
                console.log("a user disconnected!");
                removeUser(socket.id);
                io.emit("getRoomUsers", roomUsers);
                io.emit("getUsers", users);
                io.emit("getRooms", rooms);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler