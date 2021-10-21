import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, getSocket, selectSocket } from "../redux/slices/socketSlice";

export default function Home() {
  const socketInfo = useSelector(selectSocket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!socketInfo.connected){
      dispatch(connect("/api/socket"));
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
