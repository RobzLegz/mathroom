import { clearNotification } from "../redux/slices/notificationSlice";
import { addRoom } from "../redux/slices/roomSlice";
import { getSocket, setOnlineUsers, setSocket } from "../redux/slices/socketSlice";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

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

interface Message{
    roomID: string;
    username: string;
    message: string;
    userId: string;
}



const connectToSocket = (userInfo: User | null, dispatch: any) => {
    const socket = getSocket();

    if(!userInfo || !socket){
        return
    }

    socket.emit("addUser", userInfo._id);
    socket.on("getUsers", (users: User[]) => {
        dispatch(setOnlineUsers(users));
    });
}

const createRoom = (roomName: string, totalStages: number, maxPlayers: number, isPrivate: boolean, tasks: Task[], userInfo: User | null, id: string, dispatch: any, router: any) => {
    if(userInfo){
        const socket = getSocket();

        if(!socket){
            dispatch(setSocket(true));
        }

        const data: Room = {
            roomName: roomName,
            totalStages: totalStages,
            maxPlayers: maxPlayers,
            isPrivate: isPrivate,
            tasks: tasks,
            hasStarted: false,
            admin: userInfo._id,
            _id: id,
        };

        socket.emit("addRoom", data);

        socket.on("getRooms", (rooms: Room[]) => {
            console.log(rooms)
            rooms.forEach((room) => {
                dispatch(addRoom(room));
            });
        });

        dispatch(clearNotification());
        router.push(`/rooms/${id}`);
    }
}

const joinRoom = (roomId: string | string[] | undefined, userInfo: User) => {
    if(typeof(roomId) !== "string"){
        return
    }

    const socket = getSocket();

    if(!socket){
        return
    }

    socket.emit("joinRoom", userInfo._id, userInfo.username, roomId);
}

const sendSocketMessage = (message: Message) => {
    const socket = getSocket();

    if(!socket){
        return
    }

    socket.emit("sendMessage", message);
}

const exitSocketRoom = (userInfo: User) => {
    const socket = getSocket();

    if(!socket){
        return
    }

    socket.emit("leaveRoom", userInfo._id);
}

const startSocketGame = (roomId: string) => {
    const socket = getSocket();

    if(!socket){
        return
    }

    socket.emit("startGame", roomId);
}

const completeSocketLevel = (passed: boolean) => {
    const socket = getSocket();

    if(!socket){
        return
    }

    if(passed){
        socket.emit("completeLevel");
    }else{
        socket.emit("failLevel");
    }
}

export {
    connectToSocket,
    createRoom,
    sendSocketMessage,
    joinRoom,
    exitSocketRoom,
    startSocketGame,
    completeSocketLevel
};