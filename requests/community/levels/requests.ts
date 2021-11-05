import axios from "axios";
import { setActiveLevel, setLevels } from "../../../redux/slices/communitySlice";
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
            dispatch(setActiveLevel(res.data));
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const createNewLevel = (difficulty: number, question: string, instruction: string, correctValue: number, image: string, token: string, dispatch: any, router: any) => {
    dispatch(setNotification({type: "loading", message: "Creating new level"}));

    if(!question){
        return dispatch(setNotification({type: "error", message: "Please enter task question."}))
    }

    if(!correctValue){
        return dispatch(setNotification({type: "error", message: "Please enter correct answer to Your question."}))
    }

    if(!instruction){
        return dispatch(setNotification({type: "error", message: "Please enter helpful tips that can help solving the task."}))
    }

    let urlCheckRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

    let urlCheck = image.match(urlCheckRegex);

    if(!urlCheck){
        return dispatch(setNotification({type: "error", message: "Please enter a valid image url"}))
    }

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
            router.push("/community")
        }).catch((err) => {
            const message: string = err.response.data.err;
            dispatch(setNotification({type: "error", message: message}));
        });
}

const passCommunityLevel = (id: string | string[] | undefined, token: string, dispatch: any, router: any) => {
    if(typeof(id) !== "string"){
        return dispatch(setNotification({type: "error", message: "OoOoOps something went worng"}));
    }

    const headers = {
        headers: {
            Authorization: token
        }
    }

    axios.post(`/api/community/levels/pass/${id}`, {}, headers)
        .then((res) => {
            router.push("/community");
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