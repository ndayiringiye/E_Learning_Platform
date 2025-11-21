import mongoose from "mongoose";
import User from "../modules/userModule.js";
import jwt from "jsonWebToken";

const loginService = ( async(req , req) =>{
const {email, password} = req.body;
if(!email || !password){
    return res.status(404).json({message : "both email and password are required here ...",})
};
try {
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).jsos({message: "invalid credential", success: false})
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    const isMatched = await User.comparePassword({password});
    if(!isMatched){
        try {
            res.status(404).json({success: false, message: "user credential are matched successfully", data: isMatched});
        } catch (error) {
            res.status(404).json({success: false, message: "user credential are not matched", error: error.message});
            
        }
    };
    const generateToken = jwt
} catch (error) {
    
}

})