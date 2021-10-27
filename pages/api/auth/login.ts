import connectDB from "../../../utils/connectDB";
import bcrypt from "bcrypt";
import Users from "../../../models/userModel";
import { createAccessToken, createRefreshToken } from "./../../../utils/generateToken";
import {validateEmail} from "../../../utils/valid";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req: any, res: any) => {
    try{
        const { email, password } = req.body;

        const emailCheck = validateEmail(email);
        if(!emailCheck){
            return res.status(400).json({err: "Please enter a valid email."});
        }

        const user = await Users.findOne({ email: email });
        if(!user){
            return res.status(400).json({err: "A user with this email does not exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({err: "Incorrect password."})
        }

        const access_token = createAccessToken({id: user._id});
        const refresh_token = createRefreshToken({id: user._id});

        res.json({
            msg: "Login Success!",
            access_token: access_token,
            refresh_token: refresh_token,
            user: user,
        });
    }catch(err: any){
        return res.status(500).json({err: err.message})
    }
}