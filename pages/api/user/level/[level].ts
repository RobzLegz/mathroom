import connectDB from "../../../../utils/connectDB";
import auth from "../../../../middleware/auth";
import Users from "../../../../models/userModel";

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

        if(user.level >= Number(level)){
            return res.status(400).json({err: "You have already passed this level!"});
        }

        if(user.level < Number(level)){
            return res.status(400).json({err: "You can't be on this level!"});
        }

        const nextLevel = Number(level) + 1;

        await Users.findByIdAndUpdate({_id: user.id}, {level: nextLevel});

        res.json({msg: "Level passed"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}