import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/PRegister.scss'
import '../styles/Newusercompo.scss'
import {message} from 'antd'


// this component is used to create  child users
function NewUserCompo({ users }) {


  const navigate = useNavigate();
//   below states are defined to capture user's password, modal display, username and flag
  const [pass, SetPass] = React.useState("");
  const [modal, setModal] = useState("hidden");
  const [user,setUser] = useState("")
  const [flag,setFlag] = useState ("0");

 
// checkme function is triggered from the below form element, it makes a backend call to check if the user with right credentials exists,
// if user exists, it navigates the user to home.
  const checkme = async () => {
    const CUser = {
      firstName: users.firstName,
      password: pass,
    };
    console.log("cUser:",CUser)
    try{
    const resp = await fetch(`http://localhost:5001/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CUser),
    });
    console.log("res:",resp)
    if (resp.status === 200) {
      console.log("successfully Logged in");
      localStorage.setItem("child-user", JSON.stringify(users));
      navigate("/home");
    }
 } catch (error){
        message.error("Invalid Password!, Please Try Again")
    }
    // console.log(e.value);
  };

  return (
    <>
    
    {/* creating a form element, with username as readonly and password as variable for user to enter */}
    <div
      className="child"
      onClick={(e) => {
        setUser(e.target.innerHTML)
        if( flag === "0"){
            setFlag("1")
            setModal("")
        } else {
            setFlag("0")
            setModal("hidden")
        }

       
      }}
    >
      <div className="currentUser formelement" value={users.firstName}>
        {users.firstName}
      </div>
    </div>
    <div><form  className={`modal123 ${modal}`}>
    <h1>Hi {users.firstName}!</h1>
     {/* once the close button is triggered, it exits the modal*/}
        <button  title="close" className={`${modal}`} onClick={() =>{
            setModal("hidden")
            setFlag("0")
        }}> <span>&#9587;</span> </button>
        
    <p>User</p>
    <input type="text" value={user} readOnly={true} />
    <hr />
    <p>Password</p>
    {/* the onchange function captres the password elemet to pass it to backend when triggered*/}
    <input
      type="Password"
      onChange={(e) => {
        SetPass(e.target.value);
      }}
      placeholder="Enter Password"
     required/>
    <hr />
    {/* this button triggers the checkme fucntion when clicked*/}
    <button onClick={(e) => {
       e.preventDefault();
      checkme()
      console.log("inside signin")
    }} className="ButtonStyle">
      Sign in
    </button>
     {/* this button navigates to the childreset page which triggers the forgot password module*/}
    <button type="button" onClick={() =>{navigate('/childreset')
                    localStorage.setItem('forgot-user',JSON.stringify(users.firstName))
}} className="ButtonStyle forget">
      Forgot Password
    </button>
  </form></div>
    </>
  );
}

export default NewUserCompo;
