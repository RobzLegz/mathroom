import { useRouter } from "next/dist/client/router";
import Head from "next/head"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InstructionContainer from "../components/containers/instructions/InstructionContainer";
import Notification from "../components/notifications/Notification";
import { setPrevURL } from "../redux/slices/userSlice";

export default function Instructions() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if(router.pathname !== "/menu"){
      dispatch(setPrevURL(router.pathname));
    }
  }, [router]);

  return (
    <div className="instructionPage">
      <Head>
        <title>MathRoom | Instructions</title>
      </Head>
      
      <Notification />

      <InstructionContainer />
    </div>
  )
}
