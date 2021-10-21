import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, getOnlineUsers, getSocket, selectSocket } from "../redux/slices/socketSlice";
import { selectUser } from "../redux/slices/userSlice";

interface User{
  userId: string;
  socketId: string;
}

export default function Home() {
  const socketInfo = useSelector(selectSocket);
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!socketInfo.connected){
      dispatch(connect("/api/socket.io"));
    }else if(socketInfo.connected && userInfo.info){
      const socket = getSocket();
      socket.emit("addUser", userInfo.info._id);
      socket.on("getUsers", (users: User[]) => {
        dispatch(getOnlineUsers(users));
      });
    }
  }, [socketInfo.connected]);

  return (
    <div>
      <Head>
        <title>MathRoom</title>
      </Head>
    </div>
  )
}
