import React from 'react'
import {useNavigate} from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import { Form ,message} from 'antd'
import '../styles/PRegister.scss'

// parent register page
function PRegister() {
  const navigate = useNavigate();
  // states to capture the below variables
  const[email,setEmail] = React.useState("");
  const[password,setPassword] = React.useState("");
  const[flatname,setFlatname] = React.useState("");

  // sends a backend call with captures registration data and creates a parent user, if success moves to login page
const save1 = async (e) =>{
  e.preventDefault();
  const PUser = {
    flatName: flatname,
    email : email,
    password: password
  }
  const verify ={
    email : email,
    password: password
  }

  try {   
    console.log(PUser)
       const response =  await fetch('http://localhost:5001/flat',{
         method : 'POST' ,
        headers: {
          'Content-Type':"application/json"
         },
        body:JSON.stringify(PUser) });
   
    //    sends a alert kinda message in the webpage
        if(response.status === 201){
          const res =  await fetch('http://localhost:5001/auth',{
         method : 'POST' ,
        headers: {
          'Content-Type':"application/json"
         },
        body:JSON.stringify(verify) });

        if(res.status===200){
          message.success('An email is sent to your mail . Please verify');
          navigate('/login')
        }

       
    }

    if (response.status===400){
          let mes = await response.json()
      message.error(mes.message);
    }
    if (response.status===409){
      let mes = await response.json()
  message.error(mes.message);
}
    } catch (error) {
    console.log('something went wrong!')
}


}
const movetologin = () =>{

  navigate('/login')
}


return (
  // contains form field which captures all necessary fields and when submitted triggers the save1 function
  <div className='container_register'>
    <div className='row justify-content-center align-items-center w-100 h-100'>

      <div className='col-md-5'>
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

      <div className='col-md-6'>
        <Form layout='vertical' onSubmit={save1}>
          <div className="container">
            <h1 className='registertxt'>Flat Mate Expense Tracker-Register</h1>
            <p className='registertxt'>Please fill in this form to create an account.</p>
            <hr />
            <Form.Item>
              <label><b>Flat Name</b></label>
              <Input type="text" placeholder="Enter FlatName" name="flat" id="flat" onChange={(e) => setFlatname(e.target.value)} required />
            </Form.Item>

            <Form.Item>

              <label><b>Email</b></label>
              <Input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />

            </Form.Item>

            <Form.Item>
              <label ><b>Password</b></label>
              <Input type="password" placeholder="Enter Password" name="psw" id="psw" onChange={(e) => setPassword(e.target.value)} required />

            </Form.Item>

          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button  className="btn" onClick={save1}>Register</button>
            <button  className="btn" onClick={movetologin}>Already have an account? Sign in</button>
          </div>
        </Form>
      </div>

    </div>



  </div>
)
}

export default PRegister