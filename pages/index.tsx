import { useRouter } from "next/dist/client/router";
import Head from "next/head"
import { useEffect } from "react";
import Notification from "../components/notifications/Notification";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/menu");
  }, [])

  return (
    <div>
      <Head>
        <title>MathRoom</title>
      </Head>
      <Notification />
    </div>
  )
}
