import express from "express";
import { addUser,loginadmin,logoutuser } from "../controller/userController.js";
import { verifyUser } from "../middlewere/adminMiddlewere.js";
import { sendMessage } from "../controller/ChatController.js";

const router = express.Router();


router.post("/adminlogin",loginadmin)
router.post("/userSignup",addUser)
router.get("/getuser",verifyUser)
router.get("/logout",logoutuser)

router.post("/sendmessage",sendMessage)




export default router;