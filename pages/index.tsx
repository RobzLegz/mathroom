import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, selectSocket, setSocket } from "../redux/slices/socketSlice";

export default function Home() {
  const socketInfo = useSelector(selectSocket);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    if(!socketInfo.connected || !socket){
      dispatch(setSocket(true));
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
