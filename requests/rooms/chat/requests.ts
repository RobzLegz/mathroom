import { setNotification } from "../../../redux/slices/notificationSlice";
import { sendSocketMessage } from "../../../socket/options";

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

interface Message{
    roomID: string;
    username: string;
    message: string;
    userId: string;
}

const sendMessage = (e: any, roomId: string | string[] | undefined, message: string, messageTimeout: number, setMessageTimeout: any, userInfo: User, dispatch: any) => {
    e.preventDefault();

    if(typeof(roomId) !== "string"){
        return
    }

    if(!userInfo.username){
        return dispatch(setNotification({type: "error", message: "You must be logged in to send message!"}));
    }

    if(messageTimeout > 0){
        return dispatch(setNotification({type: "error", message: "You can send message after timeout!"}));
    }

    if(!message || message.length === 0){
        return 
    }

    const data: Message = {
        roomID: roomId,
        username: userInfo.username,
        message: message,
        userId: userInfo._id
    }

    setMessageTimeout(5);
    sendSocketMessage(data);
}

export {sendMessage};