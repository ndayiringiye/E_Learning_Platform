import { json } from "express";
import User from "../modules/userModule.js";

export const UserRegister = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;


    if (!name || !email || !password || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password, age) are required",
      });
    }

    if (role === "student") {
      if (age < 18 || age > 35) {
        return res.status(400).json({
          success: false,
          message: "Student age must be between 18 and 35",
        });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    
    const newUser = await User.create({ name, email, password, age, role });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

export default UserRegister;

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email, role: "student" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

  
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } 
    );

  
    const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } 
    );

    res.status(200).json({
      success: true,
      message: "Student login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Student Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Student login failed",
      error: error.message,
    });
  }
};