import connectDB from "../../../utils/connectDB";
import valid from "../../../utils/valid";
import bcrypt from "bcrypt";
import Users from "../../../models/userModel";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req: any, res: any) => {
    try{
        const { username, email, password, cf_password } = req.body;

        const errMsg = valid(username, email, password, cf_password);
        if(errMsg){
            return res.status(400).json({err: errMsg});
        }

        const user = await Users.findOne({ email: email });
        if(user){
            return res.status(400).json({err: "This email already exists."});
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new Users({ 
            username, email, password: passwordHash 
        });

        await newUser.save();
        res.json({msg: "Register Success!"});
    }catch(err: any){
        return res.status(500).json({err: err.message})
    }
}