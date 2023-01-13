import * as resetservice from './../services/resetpassword-service.js'


const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

export const post = async (req,res) =>{

    try {
        const sendlink = await resetservice.sendResetLink(req,res);
        
    } catch (error) {
        setError(error,res)
    }
}

export const get =async (req,res) => {
    try {
        const verifyLink = await resetservice.verifyLink(req,res);
    } catch (error) {
        setError(error,res)
    }
}


export const newpassword = async (req,res) => {
    try {
        const password = await resetservice.setNewPassword(req,res);
    } catch (error) {
        setError(error,res)
    }
}

export const postChild = async (req,res) =>{

    try {
        console.log("inside child")
        const sendlink = await resetservice.sendResetLinkChild(req,res);
        
    } catch (error) {
        setError(error,res)
    }
}

export const getChild =async (req,res) => {
    try {
        const verifyLink = await resetservice.verifyLinkChild(req,res);
    } catch (error) {
        setError(error,res)
    }
}

export const newpasswordChild = async (req,res) => {
    try {
        const password = await resetservice.setNewPasswordChild(req,res);
    } catch (error) {
        setError(error,res)
  
    }
}
