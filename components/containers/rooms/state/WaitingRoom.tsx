import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectRooms } from "../../../../redux/slices/roomSlice";
import { selectUser } from "../../../../redux/slices/userSlice";
import { sendMessage } from "../../../../requests/rooms/chat/requests";
import { exitRoom } from "../../../../requests/rooms/requests";

const players = [
    {
        username: "bobik",
        _id: "616fcdb134266d3a2c1b5ac3"
    },
    {
        username: "biggerBob",
        _id: "616fcdb134266d3a2c1b5a3"
    },
    {
        username: "biggerBob",
        _id: "616fcdb134266d3a2c1b5a3"
    },
    {
        username: "biggerBob",
        _id: "616fcdb134266d3a2c1b5a3"
    },
    {
        username: "biggerBob",
        _id: "616fcdb134266d3a2c1b5a3"
    }
]

interface Message{
    roomID: string;
    username: string;
    message: string;
    color: number;
}

function WaitingRoom() {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);

    const router = useRouter();
    const dispatch = useDispatch();

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageTimeout, setMessageTimeout] = useState<number>(0);

    useEffect(() => {
        if(messageTimeout > 0){
            setTimeout(() => {
                setMessageTimeout(messageTimeout - 1);
            }, 1000);
        }
    }, [messageTimeout]);

    if(roomInfo.activeRoom){
        return (
            <div className="gameRoom__waiting">
                <div className="gameRoom__waiting__inner">
                    <div className="gameRoom__waiting__inner__header">
                        <h1>{roomInfo.activeRoom.roomName}</h1>
                        <h1>7/{roomInfo.activeRoom.maxPlayers}</h1>
                    </div>
        
                    <div className="gameRoom__waiting__inner__body">
                        <div className="gameRoom__waiting__inner__body__players">
                            {players.map((player, i) => {
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
                            <form className="gameRoom__waiting__inner__body__chat__box">
                                <input 
                                    type="text" 
                                    name="" 
                                    id="" 
                                    placeholder={`Message ${roomInfo.activeRoom.roomName}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button onClick={(e) => sendMessage(e, router.query.id, message, messageTimeout, setMessageTimeout, userInfo.info, dispatch)}>Send</button>
                            </form>
                        </div>
                    </div>

                    <button onClick={() => exitRoom(dispatch, router)}>Leave room</button>
                </div>
            </div>
        )
    }

    return null;
}

export default WaitingRoom
