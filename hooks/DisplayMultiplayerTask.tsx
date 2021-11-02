import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import tasks from '../data/tasks';
import { selectRooms } from '../redux/slices/roomSlice';
import { selectUser } from '../redux/slices/userSlice';
import { renderActiveTaskFromType } from './DisplayLevelFromType';

interface Task{
    type: string;
}

interface RoomUser{
    username: string;
    level: number;
    points: number;
    userId: string;
}

interface Props{
    needHelp: boolean;
    setNeedHelp: any;
}

const DisplayMultiplayerTask: React.FC<Props> = ({needHelp, setNeedHelp}) => {
    const userInfo = useSelector(selectUser);
    const roomInfo = useSelector(selectRooms);
    
    const [activeTask, setActiveTask] = useState<null | Task>(null);

    useEffect(() => {
        if(userInfo.info && roomInfo.roomUsers && roomInfo.roomUsers.some((user: RoomUser) => user.userId === userInfo.info._id)){
            let user: RoomUser = roomInfo.roomUsers.find((rUser: RoomUser) => rUser.userId === userInfo.info._id);
            setActiveTask(tasks[user.level])
        }
    }, [userInfo.info, roomInfo.roomUsers, activeTask]);

    if(!activeTask){
        return null;
    }

    return renderActiveTaskFromType(activeTask.type, needHelp, setNeedHelp, true);
}

export default DisplayMultiplayerTask
