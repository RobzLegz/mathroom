import connectDB from "../../../utils/connectDB";
import Rooms from "../../../models/roomModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getRoomInfo(req, res);
            break;
        case "DELETE":
            await deleteRoom(req, res);
            break;
    }
}

const getRoomInfo = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const room = await Rooms.findById({_id: id});
        if(!room){
            return res.status(400).json({err: "Couldn't find a room with that id!"});
        }

        res.json(room);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const deleteRoom = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const admin = await auth(req, res);

        const testRoom = await Rooms.findById({_id: id});
        if(!testRoom){
            return res.status(400).json({err: "Couldn't find a room with that id!"});
        }

        if(testRoom.admin !== admin.id){
            return res.status(400).json({err: "You can't delete this room!"});
        }
        
        await testRoom.delete();

        res.json({msg: "Delete success!"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}