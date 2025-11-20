import { Express } from "express";
import UserRegister from "../services/userService.js";
 const router = Express();
 router.post("users/signup", UserRegister);
 export default router;