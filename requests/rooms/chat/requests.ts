import { setNotification } from "../../../redux/slices/notificationSlice";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

const sendMessage = (e: any, mesasge: string, messageTimeout: number, setMessageTimeout: any, userInfo: User, dispatch: any) => {
    e.preventDefault();

    if(!userInfo.username){
        return dispatch(setNotification({type: "error", message: "You must be logged in to send message!"}));
    }

    if(messageTimeout > 0){
        return dispatch(setNotification({type: "error", message: "You can send message after timeout!"}));
    }

    if(!mesasge || mesasge.length === 0){
        return 
    }

    setMessageTimeout(5);
}

export {sendMessage};