import connectDB from "../../../../../utils/connectDB";
import Levels from "../../../../../models/levelModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getLevels(req, res)
            break;
    }
}

const getLevels = async (req: any, res: any) => {
    try{
        const admin = await auth(req, res);

        if(admin.role !== "admin"){
            return res.status(400).json({err: "Only admins can access unreviewed levels!"});
        }

        const levels = await Levels.find({accepted: false});

        res.json(levels);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}