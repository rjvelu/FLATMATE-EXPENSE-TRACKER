import { User}from "../models/User.js";
import bcrypt  from 'bcrypt'
import mongoose from "mongoose";
import {validate,login_validate} from '../models/User.js'
import {Token }from "../models/token.js";
import {Flat} from "../models/flat.js";
import { tracking } from "../models/tracking.js";
import { expense } from "../models/expense.js";
// this file is used for crud operations of user profile
export const save = async (req,res) => {
    let saved = null
    const { error } = validate(req.body);

		if (error){
           
			res.status(400);
            saved = { message: error.details[0].message }
            return saved
        }

		const user = await User.findOne({ email: req.body.email });
		if (user) {
            
			 res.status(409)
             saved = { message: "User with given email already Exist!" };
             return saved
        }
        const use = req.body
		 const salt = await bcrypt.genSalt(10);
		 const hashPassword = await bcrypt.hash( use.password, salt);
        
        use.password = hashPassword
       

       const flat = await Flat.findOne({_id:req.params.id});
     
        
        use.flatId = mongoose.Types.ObjectId(req.params.id);
        const newUser = new User(use);
         saved =   await newUser.save();

        

  
        let users = flat.User;
        users.push(saved._id);
        flat.User = users;
       
       await Flat.findOneAndUpdate({_id:req.params.id},flat);
     
		res.status(201);
        return saved;
}
// verify the password
export const verify = async (req,res) => {

    const user = await User.findOne({ _id: req.params.id });
 
		if (!user) return res.status(400).send({ message: "Invalid link" });

        const query={
            userId: user._id,
			token: req.params.token
        }
      
		const token = await Token.findOne(query);
      
		if (!token) return res.status(400).send({ message: "Invalid link" });

		
        const filter = { _id: user._id};
        const update = {verified: true };
        User.findOneAndUpdate(filter,update,{
            new: true
        }).exec();
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });    

}

// this function is used to verify and fetch the user creds
export const fetchUser = async (req,res) => {


    let users = User.find({flatId:mongoose.Types.ObjectId(req.params.id) });
    res.status(200);
    return users;
}

// this function is used to verify the login credentials of the user
export const userLogin = async (req,res) => {
   
	

    const user =  await User.findOne({ firstName: req.body.firstName }).exec();
      
        
    if (!user){
        return res.status(401);
}
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword){
        return res.status(401);
    }
   
    res.status(200);
    return user;

}

// this function is used to update the child profile
export const update_profile = async(req,res) => {
    const updated = User.findOneAndUpdate({_id:req.params.id},req.body,{
        new: true
    }).exec()
    return updated
}

// this function is used to delete the child profile
export const delete_profile = async(req,res) => {
    const deleted = await User.findOneAndDelete({_id:req.params.id}).exec();
    await tracking.findOneAndDelete({_user_id:req.params.id});
    await expense.findOneAndDelete({_user_id:req.params.id});

    return deleted;
}



