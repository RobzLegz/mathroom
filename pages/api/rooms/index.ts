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
        const rooms = await Rooms.find({hasStarted: false, isPrivate: false});

        res.json(rooms);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const createRoom = async (req: any, res: any) => {
    try{
        const {roomName, totalStages, maxPlayers, isPrivate, tasks} = req.body;

        if(!roomName || !maxPlayers && maxPlayers !== 0 || tasks.length < totalStages){
            return res.status(400).json({msg: "Please fill all fields!"});
        }

        const admin = await auth(req, res);
        
        const checkRooms = await Rooms.find({admin: admin._id});
        if(checkRooms.length > 0){
            return res.status(400).json({msg: "You can't create two rooms at the same time!"});
        }

        const nameCheckRooms = await Rooms.find({roomName: roomName});
        if(nameCheckRooms.length > 0){
            return res.status(400).json({msg: "There can't be multiple rooms with the same name!"});
        }
        
        const newRoom = new Rooms({
            roomName: roomName,
            totalStages: totalStages,
            maxPlayers: maxPlayers,
            isPrivate: isPrivate,
            tasks: tasks,
            admin: admin.id,
        });

        await newRoom.save();

        res.json({msg: "Created a new room!", roomId: newRoom._id});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}