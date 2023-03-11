import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const isAuthorized = async(req,res,next)=>{
    let token;

    if(req.headers){
        try {
            token = req.headers["x-auth-token"]
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            console.log(decode);

            req.user = await User.findById(decode.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send(error)
        }
    }

    if(!token){
        return res.status(400).json({message:"Access Denied :- Invalid Authorization "})
    }


}

export {isAuthorized}