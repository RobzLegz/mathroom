import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../redux/slices/notificationSlice";
import { selectRooms } from "../../../../redux/slices/roomSlice";
import { selectUser } from "../../../../redux/slices/userSlice";
import { sendMessage } from "../../../../requests/rooms/chat/requests";
import { disbandRoom, exitRoom } from "../../../../requests/rooms/requests";

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

interface User{
    username: string;
    email: string;
    role: string;
    avatar: string;
    level: number;
    _id: string;
}

interface RoomUser{
    userId: string;
    socketId: string;
    roomId: string;
    username: string;
}

function WaitingRoom() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);

    const router = useRouter();
    const dispatch = useDispatch();

    const {id} = router.query;

    const [message, setMessage] = useState<string>("");
    const [messageTimeout, setMessageTimeout] = useState<number>(0);

    useEffect(() => {
        if(messageTimeout > 0){
            setTimeout(() => {
                setMessageTimeout(messageTimeout - 1);
            }, 1000);
        }
        if(message.length > 0 && messageTimeout > 0){
            setMessage("");
        }
    }, [messageTimeout, message]);

    if(roomInfo.activeRoom && userInfo.info){
        return (
            <div className="gameRoom__waiting">
                <div className="gameRoom__waiting__inner">
                    <div className="gameRoom__waiting__inner__header">
                        <h1>{roomInfo.activeRoom.roomName}</h1>
                        <h1>{typeof(id) === "string" && roomInfo.roomUsers ? roomInfo.roomUsers.filter((user: RoomUser) => user.roomId === id).length : "0"}/{roomInfo.activeRoom.maxPlayers}</h1>
                    </div>
        
                    <div className="gameRoom__waiting__inner__body">
                        <div className="gameRoom__waiting__inner__body__players">
                            {roomInfo.roomUsers && typeof(id) === "string" && roomInfo.roomUsers.filter((u: RoomUser) => u.roomId === id).map((player: User, i: number) => {
                                return(
                                    <div className="gameRoom__waiting__inner__body__players__player" key={i}>
                                        <div className="gameRoom__waiting__inner__body__players__player__icon">
                                            <div className="gameRoom__waiting__inner__body__players__player__icon__top"></div>
                                            <div className="gameRoom__waiting__inner__body__players__player__icon__bottom"></div>
                                        </div>
                                        <h3>{player.username}</h3>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="gameRoom__waiting__inner__body__chat">
                            {typeof(id) === "string" && roomInfo.messages.filter((message: Message) => message.roomID === id).map((message: Message, i: number) => {
                                return(
                                    <div className="gameRoom__waiting__inner__body__chat__message" key={i}>
                                        <h4>{message.username}</h4>
                                        <p>{message.message}</p>
                                    </div>
                                )
                            })}
                            <form className="gameRoom__waiting__inner__body__chat__box">
                                <input 
                                    type="text" 
                                    name="" 
                                    id="" 
                                    placeholder={`Message ${roomInfo.activeRoom.roomName}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button onClick={(e) => {if(message.length < 100){sendMessage(e, router.query.id, message, messageTimeout, setMessageTimeout, userInfo.info, dispatch)}else{dispatch(setNotification({type: "error", message: "You can't send long messages in waiting room chat!"}))}}}>Send</button>
                            </form>
                        </div>
                    </div>

                    <div className="gameRoom__waiting__inner__buttons">
                        {roomInfo.activeRoom.admin === userInfo.info._id ? (
                            <>
                                <button 
                                    className="gameRoom__waiting__inner__buttons__red" 
                                    onClick={() => disbandRoom(roomInfo.activeRoom._id, userInfo.token, dispatch, router)}
                                >
                                    Disband room
                                </button>
                                <button 
                                    className="gameRoom__waiting__inner__buttons__purple" 
                                    onClick={() => console.log("Started game")}
                                >
                                    Start game
                                </button>
                            </>
                        ) : (
                            <button className="gameRoom__waiting__inner__buttons__red" onClick={() => exitRoom(userInfo.info, dispatch, router)}>Leave room</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return null;
}

export default WaitingRoom