import connectDB from "../../../../utils/connectDB";
import Levels from "../../../../models/levelModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getLevel(req, res);
            break;
        case "POST":
            await accecptLevel(req, res);
            break;
        case "PUT":
            await updateLevel(req, res);
            break;
        case "DELETE":
            await deleteLevel(req, res);
            break;
    }
}

const getLevel = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const level = await Levels.findById({_id: id});
        if(!level){
            return res.status(400).json({err: "Sorry, this level doesn't exist!"});
        }

        res.json(level);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const accecptLevel = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const admin = await auth(req, res);

        if(admin.role !== "admin"){
            return res.status(400).json({err: "Sorry, only admins can review levels!"});
        }

        const foundLevel = await Levels.findById({_id: id});
        if(!foundLevel){
            return res.status(400).json({err: "Sorry, this level doesn't exist!"});
        }

        await foundLevel.update({accepted: true});

        res.json({msg: "Level accepted"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const updateLevel = async (req: any, res: any) => {
    try{
        const {id} = req.query;
        const {difficulty, question, instruction, correctValue, image} = req.body;

        if(!difficulty && !question && !instruction && !correctValue && !image){
            return res.status(400).json({msg: "Please change something!"});
        }

        const admin = await auth(req, res);

        if(admin.role !== "admin"){
            return res.status(400).json({err: "Sorry, only admins can update levels!"});
        }

        const foundLevel = await Levels.findById({_id: id});
        if(!foundLevel){
            return res.status(400).json({err: "Sorry, this level doesn't exist!"});
        }

        await foundLevel.update({
            difficulty, 
            question, 
            instruction, 
            correctValue, 
            image
        });

        res.json({msg: "Updated level!"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const deleteLevel = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const admin = await auth(req, res);

        if(admin.role !== "admin"){
            return res.status(400).json({err: "Sorry, only admins can delete this level!"});
        }

        const foundLevel = await Levels.findById({_id: id});
        if(!foundLevel){
            return res.status(400).json({err: "Sorry, this level doesn't exist!"});
        }

        await foundLevel.delete();

        res.json({msg: "Delete success!"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}