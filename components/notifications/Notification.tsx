import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearNotification, selectNotifications } from "../../redux/slices/notificationSlice";

function Notification() {
    const notificationInfo = useSelector(selectNotifications);

    const dispatch = useDispatch();

    if(notificationInfo.type === "error"){
        return (
            <div className="notification">
                <div className="notification__left">
                    <div className="notification__left__identifier__error"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                
                <div className="notification__right">
                    <div className="notification__right__close" onClick={() => dispatch(clearNotification())}>
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
                    <div className="notification__left__identifier__success"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                
                <div className="notification__right">
                    <div className="notification__right__close" onClick={() => dispatch(clearNotification())}>
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
                    <div className="notification__left__identifier__loading"></div>
                    <p>{notificationInfo.message}</p>
                </div>
                
                <div className="notification__right">
                    <div className="notification__right__close" onClick={() => dispatch(clearNotification())}>
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