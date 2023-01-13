import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Input from "antd/lib/input/Input";
import { Form } from "antd";
import "../styles/PRegister.scss";

function NewUser() {
    const navigate = useNavigate();
    // below states to capture the user variable states
    const[firstName,setfirstName] = React.useState("");
    const[lastName,setlastName] = React.useState("");
    const[password,setPassword] = React.useState("");
    const[email,setEmail] = React.useState("");

    // save1 page is triggered and makes a backend call to add a new user to the parent id
    const save1 = async(e) => {
        e.preventDefault();
        const CUser = {
          firstName : firstName,
          lastName : lastName,
          email : email,
          password: password
          }
         const parent =  JSON.parse( localStorage.getItem('parent-user'));
          const resp = await fetch(`http://localhost:5001/user/${parent._id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(CUser),
		});
          if(resp.status===200){
            navigate('/userLogin')
  
          }
    }
 
    return (
      // new user registration form with lottie animation
      <div className="container_register">
        <div className="row justify-content-center align-items-center w-100 h-100">
          <div className="col-md-5">
          <div className='lottie'>
          <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_ab0pxvgc.json"  background="transparent"  speed="1"  loop autoplay></lottie-player>
              </div>
          </div>
          <div className="col-md-5">
            <Form layout="vertical" onSubmit={save1} className="">
              <div className="">
                <h1 className="registertxt">New User Registration</h1>
                <p className="registertxt">
                  Please fill in this form to create an account.
                </p>
                <hr />
  
                <Form.Item>
                  <label>
                    <b>First Name</b>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    id="name"
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </Form.Item>

                <Form.Item>
                <label>
                  <b>Last Name</b>
                </label>
                <Input
                  type="text"
                  placeholder="Enter LastName"
                  name="lastname"
                  id="lastname"
                  onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </Form.Item>

              <Form.Item>
                <label>
                  <b>email</b>
                </label>
                <Input
                  type="text"
                  placeholder="Enter emailid"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Item>
  
                <Form.Item>
                  <label>
                    <b>Password</b>
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    id="psw"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Item>
              </div>
  
              <div className="d-flex justify-content-between align-items-center">
                <button onClick={save1} className="btn">
                  {" "}
                  Register{" "}
                </button>
  
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/userLogin");
                  }}
                >
                  {" "}
                  Already registered?{" "}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  export default NewUser
  
