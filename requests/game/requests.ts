import axios from "axios";
import { clearNotification, setNotification } from "../../redux/slices/notificationSlice";
import { startSocketGame } from "../../socket/options";

const startGame = (roomId: string | string[] | undefined, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Starting game"}))

    if(typeof(roomId) !== "string"){
        return
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.put(`/api/rooms/${roomId}`, {}, headers)
        .then((res) => {
            startSocketGame(roomId);
            dispatch(clearNotification());
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

export {startGame};