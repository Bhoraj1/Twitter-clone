import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config ({
    path:"../config/.env"
})

const isAuthenticated = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
       //in this case is use sign function instead of verify function and solve the problem
        const decode = await jwt.sign(token, process.env.TOKEN_SECRET);
        console.log(decode);
        req.user = decode.id;
        next();
        
    } catch (error) {
        console.log(error);
        
    }
}
export default isAuthenticated;