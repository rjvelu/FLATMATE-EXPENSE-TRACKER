import React from 'react'
import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import '../styles/reset.scss'
import { useNavigate } from 'react-router-dom';

// this triggers the reset page, which promps the user to enter the email for change of password
function Child_reset() {
    const [email, setEmail] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [error, setError] = React.useState("");
    const user = JSON.parse(localStorage.getItem("forgot-user"))
    const navigate = useNavigate();
    
// this triggers the backend call to send a password reset mail
    const login = async () => {
       
        const PUser = {
            email: email,
        }
        console.log(PUser);
        try {
            const response = await fetch('http://localhost:5001/reset/child', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(PUser)
            });
            console.log(response);
            if(response){
                navigate('/userLogin')
            }
            setMsg("An link is sent to your email");
            message.success("An link is sent to your email");
            setError("");
            if (
                response.status >= 400 && response.status <= 500
            ) {
                setError("Invalid Email id ");
                setMsg("");
            }

        }
        catch (error) {

        }



    }

    

  return (
    <div>
    {/* this results in a lottie animation to the left and a email prompt to the right where user enters email id  */}
      <div className='container_reset'>
            <div className='row justify-content-center align-items-center w-100 h-100'>
                <div className='col-md-4'>
                    <div className='resetlottie'>
                        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_mbginykv.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>


                <div className='col-md-5'>
                    <Form layout='vertical' >
                        <div className="container">
                            <h3 className='resettxt'>Reset password</h3>
                            <p className='resettxt'>Hi {user}, Please provide your email to reset password.</p>
                            <hr />
                            <Form.Item>
                                <label htmlFor="email"><b>Email</b></label>
                                <Input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                                {/* if the password is not in the right format, it throws the error */}
                                {error && <div>{error}</div>}
                                {msg && <div>{msg}
                                </div>}
                            </Form.Item>
                        </div>
                        {/* when button is clicked, it triggers the login function */}
                        <div className="d-flex justify-content-between align-items-center">
                            <button onClick={(e) => {
                                 e.preventDefault();
                                //  message("check your email!")
                                 console.log("inside forgot pass")
                                login();
                                }} className='resetbtn' type="button">Submit</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Child_reset
