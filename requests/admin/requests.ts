import axios from "axios";
import { setUnreviewedLevels } from "../../redux/slices/adminSlice";
import { clearNotification, setNotification } from "../../redux/slices/notificationSlice";

const acceptCommunityLevel = (id: string | string[] | undefined, token: string, dispatch: any, router: any) => {
    dispatch(setNotification({type: "loading", message: "Accepting community level."}));

    if(typeof(id) !== "string"){
        return dispatch(setNotification({type: "error", message: "Something went wrong!"}));
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/api/community/levels/${id}`, {}, headers)
        .then((res) => {
            router.push("/community/admin");
            dispatch(setUnreviewedLevels(null));
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

const deleteCommunityLevel = (id: string | string[] | undefined, token: string, dispatch: any, router: any) => {
    dispatch(setNotification({type: "loading", message: "Deleting community level."}));

    if(typeof(id) !== "string"){
        return dispatch(setNotification({type: "error", message: "Something went wrong!"}));
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.delete(`/api/community/levels/${id}`, headers)
        .then((res) => {
            router.push("/community/admin");
            dispatch(setUnreviewedLevels(null));
            dispatch(setNotification({type: "success", message: "This level has been deleted"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getUnreviewedLevels = (token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Searching for levels."}));

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.get("/api/community/levels/admin", headers)
        .then((res) => {
            dispatch(setUnreviewedLevels(res.data));
            dispatch(clearNotification());
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

export {
    acceptCommunityLevel,
    updateCommunityLevel,
    deleteCommunityLevel,
    getUnreviewedLevels
}