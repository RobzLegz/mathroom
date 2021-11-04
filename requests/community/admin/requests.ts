import axios from "axios";
import { setNotification } from "../../../redux/slices/notificationSlice";

const acceptCommunityLevel = (id: string, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Accepting community level."}));

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/api/community/levels/${id}`, {}, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "This level has been accepted"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const updateCommunityLevel = (id: string, difficulty: number, question: string, instruction: string, correctValue: number, image: string, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Updating community level."}));

    const headers = {
        headers: {
            Authorization: token
        }
    }

    const data = {
        difficulty, 
        question, 
        instruction, 
        correctValue, 
        image
    }

    axios.put(`/api/community/levels/${id}`, data, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "Update successful"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const deleteCommunityLevel = (id: string, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Deleting community level."}));

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.delete(`/api/community/levels/${id}`, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "This level has been deleted"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

export {
    acceptCommunityLevel,
    updateCommunityLevel,
    deleteCommunityLevel
}