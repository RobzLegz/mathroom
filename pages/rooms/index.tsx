import React, { useEffect } from "react"
import Head from "next/head"
import RoomContainer from "../../components/containers/rooms/RoomContainer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { checkForLogin } from "../../requests/auth/requests";
import { useRouter } from "next/dist/client/router";

const index: React.FC = () => {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
          const token = window.localStorage.getItem("refreshtoken");
    
          if(token){
            checkForLogin(dispatch, router);
          }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token, router]);

    return (
        <div className="roomPage">
            <Head>
                <title>MathRoom | Rooms</title>
            </Head>
            
            <RoomContainer />
        </div>
    )
}

export default index
