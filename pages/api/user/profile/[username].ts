import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getUserInfo(req, res);
            break;
    }
}

const getUserInfo = async (req: any, res: any) => {
    try{
        const {username} = req.query;

        const user = await Users.findOne({username: username});
        if(!user){
            return res.status(400).json({err: "Sorry, a user with this username doesn't exist!"});
        }

        res.json(user);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}