import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

// this schema is used to add user to flat
const {
	Schema
} = mongoose;

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	flatId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "flat"
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	target_saving: {
		type: Number,
		default: 0
	},
	monthly_budget: {
		type: Number,
		default: 0
	},
	verified: {
		type: Boolean,
		default: false
	},
}, {
	versionKey: false
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({
		_id: this._id
	}, "azbycx192837", {
		expiresIn: "7d",
	});
	return token;
};

export const User = mongoose.model("user", userSchema);

export const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"), 
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

export const login_validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		password: passwordComplexity().required().label("Password")
	});
	return schema.validate(data);
};

export default {
	User
};