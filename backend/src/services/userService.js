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
