import React from 'react'
//import { Form, useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import '../styles/reset.scss'

// this triggers the reset page, which promps the user to enter the email for change of password
function Reset() {
    const [email, setEmail] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [error, setError] = React.useState("");

    // this triggers the backend call to send a password reset mail
    const login = async (e) => {
        e.preventDefault();
        const PUser = {
            email: email,
        }
        console.log(PUser);
        try {
            const response = await fetch('http://localhost:5001/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(PUser)
            });
            console.log(response);
            setMsg("An link is sent to your email");
            message.success("An link is sent to your email");
            setError("");
            if (
                response.status >= 400 && response.status <= 500
            ) {
                setError("Invalid Email id ");
                message.error("Invalid Email id ");
                setMsg("");
            }

        }
        catch (error) {

        }



    }
    return (
        <div className='container_reset'>
        {/* this results in a lottie animation to the left and a email prompt to the right where user enters email id  */}
            <div className='row justify-content-center align-items-center w-100 h-100'>
                <div className='col-md-4'>
                    <div className='resetlottie'>
                        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_mbginykv.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>


                <div className='col-md-5'>
                    <Form layout='vertical' >
                        <div className="container">
                            <h3 className='resettxt'>Flat Mate Expense Tracker-Reset Password</h3>
                            <p className='resettxt'>Please provide your email to reset your password.</p>
                            <hr />
                            <Form.Item>
                                <label htmlFor="email"><b>Email</b></label>
                                <Input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                                {error && <div>{error}</div>}
                                {msg && <div>{msg}
                                </div>}
                            </Form.Item>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button  onClick={login} className='resetbtn' type="submit">Submit</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )

}

export default Reset;