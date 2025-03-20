import express from "express"
import { sendMessage,userMessage,getmessabyadmin,sendqna,fetchallQna } from "../controller/ChatController.js"
import { userMidelwere } from "../middlewere/userMidelwere.js"
import { adminMidlewere } from "../middlewere/adminMiddlewere.js"

const router = express.Router()

router.post("/sendmessage",userMidelwere,sendMessage)
router.post("/sendQna",sendqna)
router.get("/sendQna/:messagid",fetchallQna)
router.post("/sendmessageadmin",adminMidlewere,sendMessage)
router.get("/allmessageadmin/:messageid",userMessage)
router.get("/allmessage/:messageid",userMidelwere,userMessage)
router.get("/allmessageadminside/:userid",getmessabyadmin)

export default router