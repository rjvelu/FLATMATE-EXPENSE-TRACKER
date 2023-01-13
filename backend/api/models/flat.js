import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import User from "./User.js";
import { Schema} from "mongoose";

// this model is used to create flat schema
const flatSchema = new mongoose.Schema({
    flatName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    User:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    verified: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false
});

flatSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "azbycx192836", {
		expiresIn: "7d",
	});
	return token;
};
// validate username and password using joi during regis
export const validate = (data) => {
	const schema = Joi.object({
		flatName: Joi.string().required().label("Flat Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};
// validate username and password using joi duting login
export const login_validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export const Flat = mongoose.model("flat", flatSchema);


export default {Flat};