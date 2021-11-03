import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, selectSocket, setSocket } from "../../../redux/slices/socketSlice";
import { selectUser } from "../../../redux/slices/userSlice";
import { checkForLogin } from "../../../requests/auth/requests";
import { newRoom } from "../../../requests/rooms/requests";

function NewRoomContainer() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUser);
    const socketInfo = useSelector(selectSocket);

    const [roomName, setRoomName] = useState<string>("");
    const [totalStages, setTotalStages] = useState<string>("");
    const [maxPlayers, setMaxPlayers] = useState<string>("");
    const [privateRoom, setPrivateRoom] = useState<boolean>(false);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    useEffect(() => {
        const socket = getSocket();

        if(!socketInfo.connected || !socket){
            dispatch(setSocket(true));
        }
    }, []);

    return (
        <div className="newRoom__container">
            <header className="newRoom__container__header">
                <h1>Create a room</h1>
            </header>
            <form className="newRoom__container__form">
                <div className="newRoom__container__form__opt">
                    <label htmlFor="new_room_name">Room name</label>
                    <input
                        type="text"
                        name="new_room_name"
                        id="new_room_name"
                        autoComplete="off"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                <div className="newRoom__container__form__opt">
                    <label htmlFor="new_room_stages">Total stages</label>
                    <select name="new_room_stages" id="new_room_stages" onChange={(e) => setTotalStages(e.target.value)}>
                        <option></option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        {/* <option>30</option> */}
                    </select>
                </div>
                <div className="newRoom__container__form__opt">
                    <label htmlFor="new_room_max_players">Max players</label>
                    <select name="new_room_max_players" id="new_room_max_players" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)}>
                        <option></option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                    </select>
                </div>
                <div className="newRoom__container__form__switcher">
                    <div onClick={(e) => {e.preventDefault();setPrivateRoom(true)}} className={`newRoom__container__form__switcher__opt ${privateRoom ? "newRoom__container__form__switcher__opt__active" : ""}`}>Private</div>
                    <div onClick={(e) => {e.preventDefault();setPrivateRoom(false)}} className={`newRoom__container__form__switcher__opt ${privateRoom ? "" : "newRoom__container__form__switcher__opt__active"}`}>Public</div>
                </div>
            </form>
            <div className="newRoom__container__options">
                <button className="newRoom__container__options__back" onClick={() => router.push("/rooms")}>Back</button>
                <button className="newRoom__container__options__create" onClick={(e) => newRoom(e, roomName, Number(totalStages), Number(maxPlayers), privateRoom, userInfo, dispatch, router)}>Create</button>
            </div>
        </div>
    )
}

export default NewRoomContainer
