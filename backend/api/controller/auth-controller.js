
import * as authservice from '../services/auth-service.js'


// this function is used to set the error in response 
const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

// this function is used for auth service
export const post = async (req, res) =>{
        try{
            const auth = await authservice.save(req,res);
           
        }
        catch(error){
            setError(error,res)
        }
}