import {User} from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//api of Register 
export const Register = async (req,res)=>{
    try{
        const {name,Username,email,password}= req.body;
        if(!name|| !Username||!email|| !password){
            return res.status(401).json({message:"All the fields are required",
            success:false
        });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({message:"User already exists",
            success:false
        });
        }
        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name,
            Username,
            email,
            password:hashedPassword
        });
        return res.status(201).json({message:"Account created successfully",
        success:true
        })
    }catch(err){
        console.log(err);
    
    }
}
//api of Login
export const Login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(401).json({
            message:"All the fields are required.",
            success:false
        })
    };
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
        message:"Incorrect email or password",
        success:false
        })
    }
    const isMatch = await bcryptjs.compare(password, user.password)//small "user"
    if(!isMatch){
    
        return res.status(400).json({message:"Incorrect email or password",
        success:false
    });
}
const tokenData = {
    userId:user._id
}
const token = await jwt.sign(tokenData, "process.env.TOKEN_SECRET",{expiresIn:"1d"});
return res.status(201).cookie("token",token,{expiresIn:"1d", httpOnly:true}).json({
    message:`Login successfully`,
    user,
    success:true
})
    } catch (error) {
        console.log(error);
        
    }
}
//api of Logout 
export const logout = (req, res) => {
    return res.cookie("token", "",{expiresIn: new Date(Date.now())}).json({
        message:"Logged out successfully",
        success:true
    })
}

//api for bookmarks
export const bookmark = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedInUserId);
    if(user.bookmarks.includes(tweetId)){
        //remove
        await User.findByIdAndUpdate(loggedInUserId,{$pull:{bookmarks:tweetId}});
        return res.status(201).json({
            message:"Tweet removed from bookmarks",
        })

    }else{
        //bookmarsk
        await User.findByIdAndUpdate(loggedInUserId,{$push:{bookmarks:tweetId}});
        return res.status(201).json({
            message:"Tweet added to bookmarks",
        })
    }

    } catch (error) {
        console.log(error);
        
    }
    }
//controller for Profile 
export const getMyProfile = async(req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(201).json({
            user,
        
        });
    } catch (error) {
        console.log(error);
        
    }

}

//controller for other Users
export const getOtherUsers = async(req,res) => {
    try {
        const {id} = req.params;
        const otherusers = await User.find({_id:{$ne:id}}).select("-password");
        if(!otherusers){
            return res.status(404).json({
                message:"Currently No users found",
            })
        };
        return res.status(201).json({
            otherusers,
        
        });
    } catch (error) {
        console.log(error);
        
    }
}
//controller for follow
export const follow = async(req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//bhoraaj
        const user = await User.findById(userId);//Bhola
        if(!user.followers.includes(loggedInUser)){
            await User.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}});
        }else{
            return res.status(400).json({
                message:`You are already following to the ${user.name}`
            })
        };
        return res.status(201).json({
            message:`${loggedInUser.name} just follow to ${user.name}`,
        })
    } catch (error) {
        console.log(error);
        
    }
}
//controller for unfollow
export const unfollow = async(req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//bhoraaj
        const user = await User.findById(userId);//Bhola
        if(loggedInUser.following.includes(userId)){
            await User.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}});
        }else{
            return res.status(400).json({
                message:`You are not followed to the ${user.name}`
            })
        };
        return res.status(201).json({
            message:`${loggedInUser.name} just unfollow to ${user.name}`,
        })
    } catch (error) {
        console.log(error);
        
    }
}
