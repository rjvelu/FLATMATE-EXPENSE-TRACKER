import express from 'express';


import * as authcontroller from '../controller/auth-controller.js'
// authentication routes
const authrouter = express.Router();



// auth post call
authrouter.post("/",authcontroller.post);


export default authrouter;