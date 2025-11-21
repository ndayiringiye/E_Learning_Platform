import express from "express";
import UserRegister from "../services/userService.js"; 
import { AdminRegister} from "../services/AdminService.js";
import { AdminLogin } from "../services/AdminService.js";
const router = express.Router();

router.post("/users/signup", UserRegister);
router.post("/users/admin/register", AdminRegister);
router.post("/admin/login", AdminLogin);

export default router;
