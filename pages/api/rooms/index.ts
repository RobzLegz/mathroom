import connectDB from "../../../utils/connectDB";
import Rooms from "../../../models/roomModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await createRoom(req, res)
            break;
        case "GET":
            await getRooms(req, res)
            break;
    }
}

const getRooms = async (req: any, res: any) => {
    try{
        const rooms = await Rooms.find();

        res.json(rooms);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const createRoom = async (req: any, res: any) => {
    try{
        const {roomName, totalStages, maxPlayers, isPrivate} = req.body;

        const admin = await auth(req, res);
        
        const checkRooms = await Rooms.find({admin: admin.id});
        if(checkRooms && checkRooms.length > 0){
            return res.status(400).json({msg: "You can't create two rooms at the same time!"});
        }
        
        if(!roomName || !maxPlayers && maxPlayers !== 0){
            return res.status(400).json({msg: "Please fill all fields!"});
        }

        const newRoom = new Rooms({
            roomName, 
            totalStages, 
            maxPlayers, 
            isPrivate,
            admin: admin.id,
        });

        await newRoom.save();

        res.json({msg: "Created a new room!"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}