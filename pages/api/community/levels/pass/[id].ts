import connectDB from "../../../../../utils/connectDB";
import auth from "../../../../../middleware/auth";
import Users from "../../../../../models/userModel";
import Levels from "../../../../../models/levelModel";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await completeLevel(req, res);
            break;
    }
}

const completeLevel = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        if(typeof(id) !== "string"){
            return res.status(400).json({err: "Something went wrong!"});
        }

        const user = await auth(req, res);

        const foundLevel = await Levels.findById({_id: id});
        if(!foundLevel){
            return res.status(400).json({err: "Sorry, this level doesn't exist!"});
        }

        let sendLevels = user.passedLevels;
        sendLevels.push(foundLevel._id);

        await Users.findByIdAndUpdate({_id: user._id}, {passedLevels: sendLevels});

        res.json({msg: "Level passed"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}