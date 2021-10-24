import axios from "axios";
import { setNotification } from "../../redux/slices/notificationSlice";
import { setActiveRoom, setRooms } from "../../redux/slices/roomSlice";
import { getSocket } from "../../redux/slices/socketSlice";
import { createRoom, exitSocketRoom } from "../../socket/options";

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
            dispatch(setRooms(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getRoomInfo = (id: string, dispatch: any, router: any) => {
    axios.get(`/api/rooms/${id}`)
        .then((res) => {
            dispatch(setActiveRoom(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
            router.push("/rooms");
        });
}

const newRoom = (e: any, roomName: string, totalStages: number, maxPlayers: any, isPrivate: boolean, userInfo: User, dispatch: any, router: any) => {
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
            .then((res: any) => {
                const roomId: string = res.data.roomId;

                if(roomId){
                    createRoom(roomName, totalStages, maxPlayers, isPrivate, userInfo.info, roomId, dispatch, router);
                }
            }).catch((err) => {
                if(err && err.response && err.response.data){
                    const message: string = err.response.data.err;
                    if(message){
                        return dispatch(setNotification({type: "error", message: message}));
                    }

                    dispatch(setNotification({type: "error", message: "Something went wrong!"}));
                }
            });
    }   
    
}

const exitRoom = (userInfo: Info, dispatch: any, router: any) => {
    exitSocketRoom(userInfo);
    router.push("/rooms");
    dispatch(setActiveRoom(null));
}

const disbandRoom = (roomId: string, token: string, dispatch: any, router: any) => {
    const headers = {
        headers: {
            Authorization: token
        },
    }

    axios.delete(`/api/rooms/${roomId}`, headers)
        .then((res) => {
            const socket = getSocket();

            if(socket){
                socket.emit("disbandRoom", roomId);
                router.push("/rooms");
            }
        }).catch((err) => {
            const message: string = err.response.data.err;
            if(message){
                return dispatch(setNotification({type: "error", message: message}));
            }

            dispatch(setNotification({type: "error", message: "Something went wrong!"}));
        });
}

export {getRooms, getRoomInfo, newRoom, exitRoom, disbandRoom};