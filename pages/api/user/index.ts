import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getAllUsers(req, res)
            break;
    }
}

const getAllUsers = async (req: any, res: any) => {
    try{
        const users = await Users.find();

        res.json(users);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}