import Head from "next/head"
import Notification from "../components/notifications/Notification";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MathRoom</title>
      </Head>
      
      <Notification />
    </div>
  )
}
