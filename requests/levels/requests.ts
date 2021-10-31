import axios from "axios";
import { setNotification } from "../../redux/slices/notificationSlice";

const nextLevel = (level: number, token: string, router: any, dispatch: any) => {
    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/levels`, {}, headers)
        .then((res) => {
            router.push(`/levels/${level + 1}`);
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        })
}

export {nextLevel};