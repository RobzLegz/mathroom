import connectDB from "../../../../../utils/connectDB";
import auth from "../../../../../middleware/auth";
import Users from "../../../../../models/userModel";

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
        const {level} = req.query;

        const user = await auth(req, res);

        await Users.findByIdAndUpdate({_id: user._id}, {passedLevels: user.passedLevels.push(level)});

        res.json({msg: "Level passed"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}