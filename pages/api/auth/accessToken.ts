import connectDB from "../../../utils/connectDB"
import Users from "../../../models/userModel"
import jwt from "jsonwebtoken"
import { createAccessToken } from "../../../utils/generateToken"

connectDB();

export default async (req: any, res: any) => {
    try{
        const rf_tokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;

        if(!rf_tokenSecret){
            return res.status(400).json({err: "Something went wrong!"});
        }

        const rf_token = req.headers.authorization;
        if(!rf_token){
            return res.status(400).json({err: "Please login now!"});
        }

        const result: any = jwt.verify(rf_token, rf_tokenSecret);
        if(!result){
            return res.status(400).json({err: "Your token is incorrect or has expired."});
        }

        const user = await Users.findById(result.id).select("-password");
        if(!user){
            return res.status(400).json({err: "User does not exist."})
        }

        const access_token = createAccessToken({id: user._id});
        res.json({
            access_token,
            user
        });
    }catch(err: any){
        return res.status(500).json({err: err.message})
    }
}