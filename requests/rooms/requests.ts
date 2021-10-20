import axios from "axios";
import { setNotification } from "../../redux/slices/notificationSlice";
import { setActiveRoom } from "../../redux/slices/roomSlice";

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

export {getRooms, getRoomInfo};