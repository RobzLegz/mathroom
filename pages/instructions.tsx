import Head from "next/head"
import InstructionContainer from "../components/containers/instructions/InstructionContainer";
import Notification from "../components/notifications/Notification";

export default function Instructions() {
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
