import { useRouter } from "next/dist/client/router";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../redux/slices/notificationSlice";
import { selectUser } from "../../../redux/slices/userSlice";

interface Task{
    level: string;
    type: string;
    text: string;
    result: string;
    image: string;
    units: string;
    info: string;
}

interface Props{
    task: Task;
}

const LevelOption: React.FC<Props> = ({task}) => {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    if(userInfo.loggedIn){
        return (
            <div
                className={`levels__container__level levels__container__level__${Number(task.level) > 30 ? "purple" : Number(task.level) > 20 ? "red" : Number(task.level) > 10 ? "yellow" : "green"}`}
                onClick={() => {if(userInfo.info.level < Number(task.level)){return dispatch(setNotification({type: "error", message: "You haven't done the previous levels!"}))}router.push(`/levels/${task.level}`)}}
            >
                {userInfo.info.level >= Number(task.level) ? (
                    <h4>{task.level}</h4>
                ) : (
                    <img src="/svg/lock.svg" alt="padlock" />
                )}
            </div>
        )
    }
    return null;
}

export default LevelOption
