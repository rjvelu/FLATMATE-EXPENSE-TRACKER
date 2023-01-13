import * as flatservice from '../services/flat-services.js'

const setResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

// this function is used to set the error in response 
const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

// this function is used to save the parent data
export const post = async (req, res) => {
	try {
       
        const user = await flatservice.save(req,res);
        //setResponse(user,res)
	} catch (error) {
		setError(error,res)
	}
}

// this function is used to verify if the data is correct
export const get = async (req, res) => {
    try {
        const verified  = await flatservice.verify(req,res);
        //setResponse(verified,res)
        console.log(verified);
    } catch (error) {
        setError(error,res)
    }
}

// this controller call service to verify password and login
export const userLogin = async (req,res) => {
    try {
        const log = await flatservice.login(req,res);
        setResponse(log,res);
        console.log(res.status);
    } catch (error) {
        setError(error,res)
    }
}
