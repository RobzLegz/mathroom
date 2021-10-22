import React, { useEffect } from "react"
import Head from "next/head"
import RoomContainer from "../../components/containers/rooms/RoomContainer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRooms } from "../../redux/slices/roomSlice";
import { GetStaticProps } from "next"

interface Room{
    roomName: string;
    totalStages: number;
    maxPlayers: number;
    isPrivate: boolean;
    hasStarted: boolean;
    admin: string;
}

interface Props{
    rooms: Room[];
}

const index: React.FC<Props> = ({rooms}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if(rooms){
            dispatch(setRooms(rooms));
        }
    }, [rooms]);

    return (
        <div className="roomPage">
            <Head>
                <title>MathRoom | Rooms</title>
            </Head>
            
            <RoomContainer />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const clientURL = process.env.CLIENT_URL;

    if(!clientURL){
        return {
            props: {
                rooms: []
            }
        }
    }

    const res = await axios.get(`${clientURL}/api/rooms`);

    return {
        props: {
            rooms: res.data
        }
    }
}

export default index
