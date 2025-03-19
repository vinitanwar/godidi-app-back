import express from "express";
import { addUser,loginadmin } from "../controller/userController.js";
import { verifyUser } from "../middlewere/adminMiddlewere.js";
import { sendMessage } from "../controller/ChatController.js";

const router = express.Router();


router.post("/adminlogin",loginadmin)
router.post("/userSignup",addUser)
router.get("/getuser",verifyUser)
router.post("/sendmessage",sendMessage)




export default router;