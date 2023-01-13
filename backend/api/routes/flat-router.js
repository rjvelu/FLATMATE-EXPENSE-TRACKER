import express from 'express';
import * as usercontroller from '../controller/flat-controller.js'

const flatRouter = express.Router();

// parent routing for adding, checking and editing the parent variables
flatRouter.post("/",usercontroller.post );
flatRouter.get("/:id/verify/:token/",usercontroller.get)
flatRouter.post("/login",usercontroller.userLogin);
export default flatRouter;