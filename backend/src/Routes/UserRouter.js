import express from "express";
import UserRegister from "../services/userService.js"; 
import { AdminRegister , AdminLogin} from "../services/AdminService.js";

const router = express.Router();

router.post("/users/signup", UserRegister);
router.post("/users/admin", AdminRegister);
router.post("users/adminlogin", AdminLogin);

export default router;
