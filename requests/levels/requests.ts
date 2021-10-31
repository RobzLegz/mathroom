import axios from "axios";
import { setNotification } from "../../redux/slices/notificationSlice";
import { completeLevel } from "../../redux/slices/userSlice";

const nextLevel = (level: number, token: string, router: any, dispatch: any) => {
    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/api/user/level/${String(level)}`, headers)
        .then((res) => {
            dispatch(completeLevel());
            router.push(`/levels/${level + 1}`);
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        })
}

export {nextLevel};