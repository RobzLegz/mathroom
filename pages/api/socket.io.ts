import { Server } from "socket.io"

interface User{
    userId: string;
    socketId: string;
}

interface RoomUser{
    userId: string;
    socketId: string;
    roomId: string;
}

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
}

let users: User[] = [];
let roomUsers: RoomUser[] = [];
let rooms: Room[] = [];

const addUser = (userId: string, socketId: string) => {
    if(!users.some((user) => user.userId === userId)){
        users.push({ userId, socketId });
    }
};

const joinRoom = (userId: string, socketId: string, roomId: string) => {
    if(!roomUsers.some((user) => user.userId === userId)){
        roomUsers.push({ userId, socketId, roomId });
    }else{
        roomUsers.filter((user) => user.userId !== userId);
        roomUsers.push({ userId, socketId, roomId });
    }
};

const leaveRoom = (userId: string) => {
    roomUsers.filter((user) => user.userId !== userId);
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const addRoom = (data: Room) => {
    if(rooms.some((room) => room.admin !== data.admin)){
        rooms.push(data);
    }else if (rooms.length === 0){

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

            socket.on("joinRoom", (userId, socketId, roomId) => {
                joinRoom(userId, socketId, roomId);
                io.emit("getRoomUsers", roomUsers);
            });

            socket.on("leaveRoom", (userId) => {
                leaveRoom(userId);
                io.emit("getRoomUsers", roomUsers);
            });

            socket.on("addRoom", (data) => {
                addRoom(data);
                io.emit("getRooms", rooms);
            });

            socket.on("disconnect", () => {
                console.log("a user disconnected!");
                removeUser(socket.id);
                socket.emit("getUsers", users);
                socket.emit("getRooms", rooms);
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