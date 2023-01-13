import crypto from "crypto";
import sendEmail from './../utils/sendEmail.js';
import Joi from "joi";
import { Flat } from './../models/flat.js';
import passwordComplexity from "joi-password-complexity";
import {User} from "../models/User.js";
import bcrypt from 'bcrypt'
import {Token} from "../models/token.js";
//import { User } from "../models/User.js";

// base url
const BASE_URL = 'http://localhost:3000/'

// function is used to send the reset link
export const sendResetLink = async (req, res) => {

    const emailSchema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    const {
        error
    } = emailSchema.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    let user = await Flat.findOne({
        email: req.body.email
    }).exec();
    if (!user) {
        return res
            .status(409)
            .send({
                message: "User with given email does not exist!"
            });
    }

    const query = {
        userId: user._id
    }
    let token = await Token.findOne(query);
    if (!token) {
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    const url = `${BASE_URL}passwordreset/${user._id}/${token.token}/`;
    console.log(url);
    await sendEmail(user.email, "Password Reset", url);

     res.status(200).send({
        message: "Password reset link sent to your email account"
    });
    return token;
}

// used to verify link
export const verifyLink = async (req, res) => {
    console.log("verify")
    const user = await Flat.findOne({
        _id: req.params.id 
    }).exec();
    console.log(user);
    if (!user) {
        return res.status(400).send({
            message: "Invalid link"
        });
    }

    const query = {
        userId: user._id,
        token: req.params.token
    }
    let token = await Token.findOne(query);
    if (!token) {
        return res.status(400).send({
            message: "Invalid link"
        });
    }

    res.status(200).send("Valid Url");
}

// this function is used the set the newpassword
export const setNewPassword = async (req, res) => {
    const passwordSchema = Joi.object({
        password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error){
        return res.status(400).send({ message: error.details[0].message });}

    const user = await Flat.findOne({ _id: req.params.id });
    if (!user) {return res.status(400).send({ message: "Invalid link" });}

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) {return res.status(400).send({ message: "Invalid link" });}

    if (!user.verified) {user.verified = true;}

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
}

// this function is used to send the child reset link
export const sendResetLinkChild = async (req, res) => {

    console.log("inside child service")

    const emailSchema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    const {
        error
    } = emailSchema.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    let user = await User.findOne({
        email: req.body.email
    }).exec();
    if (!user) {
        return res
            .status(409)
            .send({
                message: "User with given email does not exist!"
            });
    }

    const query = {
        userId: user._id
    }
    let token = await Token.findOne(query);
    if (!token) {
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    const url = `${BASE_URL}passwordreset/child/${user._id}/${token.token}/`;
    console.log(url);
    await sendEmail(user.email, "Password Reset", url);

     res.status(200).send({
        message: "Password reset link sent to your email account"
    });
    return token;
}

// this function is used to verify the child 
export const verifyLinkChild = async (req, res) => {
    console.log("verify")
    const user = await User.findOne({
        _id: req.params.id 
    }).exec();
    console.log(user);
    if (!user) {
        return res.status(400).send({
            message: "Invalid link"
        });
    }

    const query = {
        userId: user._id,
        token: req.params.token
    }
    let token = await Token.findOne(query);
    if (!token) {
        return res.status(400).send({
            message: "Invalid link"
        });
    }

    res.status(200).send("Valid Url");
}

// this updates the new password of the child
export const setNewPasswordChild = async (req, res) => {
    const passwordSchema = Joi.object({
        password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error){
        return res.status(400).send({ message: error.details[0].message });}

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {return res.status(400).send({ message: "Invalid link" });}

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) {return res.status(400).send({ message: "Invalid link" });}

    if (!user.verified) {user.verified = true;}

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
}
