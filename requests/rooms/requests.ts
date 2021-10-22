import axios from "axios";
import { setNotification } from "../../redux/slices/notificationSlice";
import { setActiveRoom } from "../../redux/slices/roomSlice";
import { createRoom } from "../../socket/options";

interface Info{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

interface User{
    token: string;
    info: Info;
}

const getRooms = (dispatch: any) => {
    axios.get("/api/rooms")
        .then((res) => {
            console.log(res.data);
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getRoomInfo = (id: string, dispatch: any) => {
    axios.get(`/api/rooms/${id}`)
        .then((res) => {
            dispatch(setActiveRoom(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const newRoom = (e: any, roomName: string, totalStages: number, maxPlayers: any, isPrivate: boolean, userInfo: User, dispatch: any) => {
    e.preventDefault();

    if(userInfo.token){
        if(roomName.length > 10){
            dispatch(setNotification({type: "error", message: "Room name can't be that long!"}));
        }

        const headers = {
            headers: {
                Authorization: userInfo.token,
            }
        }
    
        const data = {
            roomName: roomName,
            totalStages: totalStages,
            maxPlayers: maxPlayers,
            isPrivate: isPrivate,
        }
    
        axios.post("/api/rooms", data, headers)
            .then((res) => {
                createRoom(roomName, totalStages, maxPlayers, isPrivate, userInfo.info, dispatch);
            }).catch((err) => {
                const message: string = err.response.data.err;
                dispatch(setNotification({type: "error", message: message}));
            });
    }   
    
}

const exitRoom = (dispatch: any, router: any) => {
    router.push("/rooms");
    dispatch(setActiveRoom(null));
}

export {getRooms, getRoomInfo, newRoom, exitRoom};