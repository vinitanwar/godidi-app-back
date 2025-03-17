import express from "express";
import { adminMidlewere ,verifyAdmin} from "../middlewere/adminMiddlewere.js";

import { addService,getAllservice,delteService } from "../controller/adminController.js";

const route = express.Router();

route.post("/services",adminMidlewere,addService)
route.delete("/services/:id",adminMidlewere,delteService)

route.get("/services",getAllservice)
route.get("/verifyadmin",verifyAdmin)


export default route;