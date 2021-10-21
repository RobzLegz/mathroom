import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice";
import { checkForLogin } from "../../../requests/auth/requests";
import { newRoom } from "../../../requests/rooms/requests";

function NewRoomContainer() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUser);

    const [roomName, setRoomName] = useState<string>("");
    const [totalStages, setTotalStages] = useState<string>("");
    const [maxPlayers, setMaxPlayers] = useState<string>("");
    const [privateRoom, setPrivateRoom] = useState<boolean>(false);

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch);
            }
        }
    }, [userInfo.loggedIn, dispatch]);

    return (
        <div className="newRoom__container">
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
                    <input 
                        type="number" 
                        name="new_room_stages" 
                        id="new_room_stages" 
                        autoComplete="off"
                        value={totalStages}
                        onChange={(e) => setTotalStages(e.target.value)}
                    />
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
                    <div onClick={() => setPrivateRoom(false)} className={`newRoom__container__form__switcher__opt ${privateRoom ? "newRoom__container__form__switcher__opt__active" : ""}`}>Private</div>
                    <div onClick={() => setPrivateRoom(true)} className={`newRoom__container__form__switcher__opt ${privateRoom ? "" : "newRoom__container__form__switcher__opt__active"}`}>Public</div>
                </div>
                <button onClick={(e) => newRoom(e, roomName, parseInt(totalStages), parseInt(maxPlayers), privateRoom, userInfo, dispatch)}>Create</button>
            </form>
        </div>
    )
}

export default NewRoomContainer
