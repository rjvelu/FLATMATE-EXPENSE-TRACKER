import * as userservice from '../services/user-service.js'

const setResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

// this function is used to set the error in response 
const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

// this function saves the user
export const post = async (req, res) => {
	try {
        console.log("in controller")
        const user = await userservice.save(req,res);
        console.log(res.status);
       setResponse(user,res)
        console.log(res);
	} catch (error) {
		setError(error,res)
	}
}

// this function verfies whether email link is correct or not
export const get = async (req, res) => {
    try {
        const verified  = await userservice.verify(req,res)
        //setResponse(verified,res)
        console.log(verified);
    } catch (error) {
        setError(error,res)
    }

}

export const fetchuser = async (req, res) => {
    try {
        const user  = await userservice.fetchUser(req,res)
        console.log(user);
        setResponse(user,res)
        console.log(res);
    } catch (error) {
        setError(error,res)
    }
}

export const loginuser = async (req, res) => {
    try {
        const user  = await userservice.userLogin(req,res)
        //console.log(user);
        setResponse(user,res)
        console.log(res);
    } catch (error) {
        setError(error,res)
    }
}
export const updateuser = async (req,res) => {
    try {
        const user  = await userservice.update_profile(req,res)
        //console.log(user);
        setResponse(user,res)
        console.log(res);
    } catch (error) {
        setError(error,res)
    }
}

export const deleteuser = async (req,res) => {
    try {
        const user  = await userservice.delete_profile(req,res)
        //console.log(user);
        setResponse(user,res)
        console.log(res);
    } catch (error) {
        setError(error,res)
    }
}