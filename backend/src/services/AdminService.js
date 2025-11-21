import Admin from "../modules/AdminRegister.js"; 
import bcrypt from "bcrypt";


export const AdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required",
      });
    }

    
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const newAdmin = await Admin.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });

  } catch (error) {
    console.error("Admin Registration Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Admin registration failed",
      error: error.message
    });
  }
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message
    });
  }
};
