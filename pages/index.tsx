import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "../redux/slices/socketSlice";
import { selectUser } from "../redux/slices/userSlice";
import { connectToSocket } from "../socket/options";

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
      connectToSocket(userInfo.info, dispatch);
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
