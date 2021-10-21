import { Server } from "socket.io"

interface User{
    userId: string;
    socketId: string;
}

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
    if(!users.some((user) => user.userId === userId)){
        users.push({ userId, socketId });
    }
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};

const ioHandler = (req: any, res: any) => {
    if(!res.socket.server.io){
        const io = new Server(res.socket.server);

        io.on("connection", (socket) => {
            socket.broadcast.emit("a user connected.")
            
            socket.on("addUser", (userId) => {
                addUser(userId, socket.id);
                io.emit("getUsers", users);
            });

            
        });

        io.on("disconnect", (socket) => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
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