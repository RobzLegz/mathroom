import React from "react"
import { useSelector } from "react-redux";
import { selectNotifications } from "../../redux/slices/notificationSlice";

function Notification() {
    const notificationInfo = useSelector(selectNotifications);

    if(notificationInfo.type === "error"){
        return (
            <div className="notification">
                <div className="notification__left">
                    <div className="notification__left__error notification__left__identifier"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                    <div className="notification__right">
                        <div className="notification__right__close">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
            </div>
        )
    }else if(notificationInfo.type === "success"){
        return (
            <div className="notification">
                <div className="notification__left">
                    <div className="notification__left__success notification__left__identifier"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                    <div className="notification__right">
                        <div className="notification__right__close">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
            </div>
        )
    }else if(notificationInfo.type === "loading"){
        return (
            <div className="notification">
                <div className="notification__left">
                    <div className="notification__left__loading notification__left__identifier"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                    <div className="notification__right">
                        <div className="notification__right__close">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default Notification