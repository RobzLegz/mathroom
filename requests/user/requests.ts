import axios from "axios";
import { setActiveProfile, setUsers } from "../../redux/slices/communitySlice";
import { clearNotification, setNotification } from "../../redux/slices/notificationSlice";

const getUserInfoByUsername = (username: string | string[] | undefined, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Loading"}));

    if(typeof(username) !== "string"){
        return dispatch(setNotification({type: "error", message: "Something went wrong"}));
    }

    axios.get(`/api/user/profile/${username}`)
        .then((res) => {
            dispatch(setActiveProfile(res.data));
            dispatch(clearNotification());
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const updateInfo = (name: string, username: string, email: string, token: string, dispatch: any) => {
    dispatch(setNotification({type: "loading", message: "Loading"}));
    
    const data = {
        name: name,
        username: username,
        email: email,
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.put(`/api/user/`, data, headers)
        .then((res) => {
            dispatch(setNotification({type: "success", message: "Update success"}));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const getAllUsers = (dispatch: any) => {
    axios.get("/api/user")
        .then((res) => {
            dispatch(setUsers(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

export {
    getAllUsers,
    updateInfo,
    getUserInfoByUsername
}