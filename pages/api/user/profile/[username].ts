import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import Levels from "../../../../models/levelModel";
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

        const userLevels = await Levels.find({author: user._id.toString()});

        const resUser = {
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            level: user.level,
            passedLevels: user.passedLevels,
            userLevels: userLevels,
        }

        res.json(resUser);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}