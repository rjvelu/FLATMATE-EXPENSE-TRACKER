import {User}  from './../models/User.js';
import { Flat } from './../models/flat.js';
import {Token} from './../models/token.js';
import crypto from 'crypto';
import sendEmail from './../utils/sendEmail.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const BASE_URL = 'http://localhost:5001/'

// this function is used to check the user credentials and login
export const save = async (req,res) => {
    const { error } = validate(req.body);
		if (error){
            console.log("in error")
			return res.status(400).send({ message: error.details[0].message });
        }
       
		const user =  await Flat.findOne({ email: req.body.email }).exec();
        
        
		if (!user){
			return res.status(401).send({ message: "Invalid Email or Password" });
    }

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
			return res.status(401).send({ message: "Invalid Email or Password" });
        }

		if (!user.verified) {
            const query={
                userId: user._id
            }
			let token =  await Token.findOne(query);
			if (!token) {
				const t = crypto.randomBytes(32).toString("hex")
				token =  new Token({
					userId: user._id,
					token: t,
				}).save();
                console.log(t);
				const url = `${BASE_URL}flat/${user.id}/verify/${t}`;
                console.log(url);
				await sendEmail(user.email, "Verify Email", url);
			}
			return res
				.status(200)
				.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
        //console.log(token)
		return res.status(200).send({ data: token, message: "logged in successfully" });
}

// validate id the email and password entered is correct
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};