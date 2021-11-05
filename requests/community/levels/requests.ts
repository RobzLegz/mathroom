import axios from "axios";
import { setLevels } from "../../../redux/slices/communitySlice";
import { setNotification } from "../../../redux/slices/notificationSlice";

const getCommunityLevels = (dispatch: any) => {
    axios.get("/api/community/levels")
        .then((res) => {
            dispatch(setLevels(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getCommunityLevelById = (id: string, dispatch: any) => {
    axios.get(`/api/community/levels/${id}`)
        .then((res) => {
            dispatch(setLevels(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const createNewLevel = (difficulty: number, question: string, instruction: string, correctValue: number, image: string, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Creating new level"}));

    const headers = {
        headers: {
            Authorization: token
        }
    }

    const data = {
        difficulty: difficulty,
        question: question, 
        instruction: instruction, 
        correctValue: correctValue, 
        image: image
    }

    axios.post("/api/community/levels", data, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "Your level will appear on community page when mods review it"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const passCommunityLevel = (id: string, token: string, dispatch: any) => {
    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/api/community/levels/pass/${id}`, {}, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "Congrats, You passed this level"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

export {
    createNewLevel, 
    getCommunityLevels, 
    getCommunityLevelById, 
    passCommunityLevel
};