import express from "express";
import { adminMidlewere ,verifyAdmin} from "../middlewere/adminMiddlewere.js";

import { addService,getAllservice,delteService ,getAlluser,AddQna,allservicesQna,deleteServiceqna,editQna,GEtAllnubers} from "../controller/adminController.js";

const route = express.Router();

route.post("/services",adminMidlewere,addService)
route.delete("/services/:id",adminMidlewere,delteService)
route.get("/allusers",adminMidlewere,getAlluser)

route.get("/allcounts",adminMidlewere,GEtAllnubers)

route.post("/qna/add",adminMidlewere,AddQna)
route.get("/qna/:service",allservicesQna)
route.delete("/qna/:id",adminMidlewere,deleteServiceqna)
route.put("/qna/:id",adminMidlewere,editQna)

route.get("/services",getAllservice)
route.get("/verifyadmin",verifyAdmin)


export default route;