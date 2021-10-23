import React from "react"
import { useSelector } from "react-redux";
import { selectNotifications } from "../../redux/slices/notificationSlice";

function Notification() {
    const notificationInfo = useSelector(selectNotifications);

    if(notificationInfo.type === "error"){
        return (
            <div className="notification error__message">
                
            </div>
        )
    }else if(notificationInfo.type === "success"){
        return (
            <div className="notification success__message">
                
            </div>
        )
    }else if(notificationInfo.type === "loading"){
        return (
            <div className="notification loading__message">
                
            </div>
        )
    }
    return null;
}

export default Notification