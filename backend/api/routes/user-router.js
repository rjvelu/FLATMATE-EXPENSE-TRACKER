import express from 'express';
import * as usercontroller from '../controller/user-controller.js'

const userRouter = express.Router();

// user profile updation routes
userRouter.post("/login",usercontroller.loginuser);
userRouter.post("/:id",usercontroller.post );
userRouter.get("/:id/user/:token/",usercontroller.get)
userRouter.get("/:id",usercontroller.fetchuser );
userRouter.put("/:id",usercontroller.updateuser);
userRouter.delete("/:id",usercontroller.deleteuser);
export default userRouter;