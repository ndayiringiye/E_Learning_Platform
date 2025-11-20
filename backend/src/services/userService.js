import User from "../modules/userModule.js";
import bcrypt from "bcrypt"

const UserRegister  = (async (req , res) =>{
const {name, email, password, role} = req.body
if(!name || !email || !password){
 return res.status(404).json({success:false, error: "all user credential are required"})
}
try {
    const user = User.create({email, password})
    if(user){
      return  res.status(500).json({message: "already user have those credential exist"})
    }
    const isMatched = user.compare(email, password);
    if(!isMatched){
      return  res.status(404).json({success: false , error: error.message , mmessage: "user does not exist"})
    }
    const isPasswordHashed = bcrypt.hash(12, password);
    if(isPasswordHashed){
      return   res.status(500).json({message:"password hashed successfully", data: password })
    }
    const saveUser =  User.json({
        name: name.name,
        email: email.email,
        password: isPasswordHashed,
        User,
        message : "user created account successfully",
        success: true,
    })
    await saveUser.save();

} catch (error) {
    res.status(404).json({success: false, message: "user registering failured", error: error.message})
}
})
export default UserRegister;