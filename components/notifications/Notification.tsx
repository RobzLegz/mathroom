import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearNotification, selectNotifications } from "../../redux/slices/notificationSlice";

function Notification() {
    const notificationInfo = useSelector(selectNotifications);

    const dispatch = useDispatch();

    useEffect(() => {
        if(notificationInfo.message === "Incorrect answer!" || notificationInfo.message === "Congrats, You answered correctly!"){
            setTimeout(() => {
                dispatch(clearNotification());
            }, 2900);
        }
    }, [notificationInfo.message]);

    if(notificationInfo.type === "error"){
        if(notificationInfo.message === "Incorrect answer!"){
            return (
                <div className="floatingNotification floatingNotification__red">
                    <img src="/svg/cross.svg" alt="white cross inside a red circle" />
                </div>
            )
        }

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
        if(notificationInfo.message === "Congrats, You answered correctly!"){
            return (
                <div className="floatingNotification floatingNotification__green">
                    <img src="/svg/correct.svg" alt="white cross inside a red circle" />
                </div>
            )
        }

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
            </div>
        )
    }
    return null;
}

export default Notification