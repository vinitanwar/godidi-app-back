import express from "express";
import { addUser,loginadmin,getuser ,signupadmin,newuser} from "../controller/userController.js";
import { verifyUser } from "../middlewere/adminMiddlewere.js";

const router = express.Router();


router.post("/adminlogin",loginadmin)

router.get("/user-ss",loginadmin)

router.post("/adminsignup",signupadmin)

router.post("/userSignup",addUser)
router.get("/getuser",verifyUser)



router.get("/getuser",newuser)

export default router;