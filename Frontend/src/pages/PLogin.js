import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import { Form,message } from 'antd'
import '../styles/PRegister.scss'

// parent login page
function PLogin() {
  const navigate = useNavigate();
  // states to capture the below variables
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

// checks if the user exits, if yes navigates to the choose page
  const login = async (e) => {
    e.preventDefault();
    const PUser = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post('http://localhost:5001/flat/login', PUser)
      if (response.status === 200) {
        localStorage.setItem('parent-user', JSON.stringify({ ...response.data, password: '' }))
        sessionStorage.setItem('parent-user', JSON.stringify({ ...response.data, password: '' }))
        navigate('/choose')
      }
    }
    catch (error) {
      console.log(error);
      message.error("Invalid email id or password")
      //setError("Invalid email id or password");
    }

  }


  return (
    // contains form field which captures email and passord and when submitted triggers the login function
    <div className='container_register'>
      <title>Registration</title>
      <div className='row justify-content-center align-items-center w-100 h-100'>
        <div className='col-md-6'>
          <form onSubmit={login}>
            <div className="container">
              <h1>Flat Mate Expense Tracker-Login</h1>
              <hr />
              <Form.Item>

                <label htmlFor="email"><b>Email</b></label>
                <Input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
              </Form.Item>
              <Form.Item>

                <label htmlFor="psw"><b>Password</b></label>
                <Input type="password" placeholder="Enter Password" name="psw" id="psw" onChange={(e) => setPassword(e.target.value)} required />
              </Form.Item>

            </div>
            {error && <div>{error}</div>}
            <div className="d-flex justify-content-between align-items-center">
              <button type="btn" className="btn">Login</button>
              <button className="btn" onClick={() => { navigate('/register') }}>Dont have an account?</button>
              <button className="btn" onClick={() => { navigate('/reset') }}>Forgot password?</button>
            </div>

            {/* <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn">Register</button>
              <button className="btn" onClick={movetologin}>Already have an account? Sign in</button>
            </div> */}

          </form>
        </div>
        <div className='col-md-6'>
          <div className='lottie'>
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_ocib98vu.json"
              background="transparent"
              speed="1"
              loop
              autoplay>

            </lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PLogin 
