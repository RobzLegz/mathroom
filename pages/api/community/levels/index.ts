import connectDB from "../../../../utils/connectDB";
import Levels from "../../../../models/levelModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await createLevel(req, res)
            break;
        case "GET":
            await getLevels(req, res)
            break;
    }
}

const getLevels = async (req: any, res: any) => {
    try{
        const levels = await Levels.find({accepted: true});

        res.json(levels);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const createLevel = async (req: any, res: any) => {
    try{
        const {difficulty, question, instruction, correctValue, image} = req.body;

        if(!difficulty || !question || !instruction || !correctValue || !image){
            return res.status(400).json({msg: "Please fill all fields!"});
        }

        const admin = await auth(req, res);

        const newLevel = new Levels({
            difficulty: difficulty,
            question: question,
            instruction: instruction,
            correctValue: correctValue,
            author: admin._id,
            image: image,
        });

        await newLevel.save();

        res.json({msg: "Created a new level!", levelId: newLevel._id});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}