import React from 'react'
import {useNavigate} from 'react-router-dom'
// import '../styles/NewUser.scss'
import '../styles/UserCreation.scss'
// import './UserCreation';

function UserCreation() {
    const navigate = useNavigate();


// this is the choose page, which routes users to either register under the parent id or login
  return (
<div className='user_container'>
    <div className='row justify-content-center align-items-center w-100 h-100'>

    <div className='col-md-10'>
        <div className='d-flex justify-content-between align-items-center'>
          <button className="btn btn-left" onClick={ () =>{navigate('/newUser')}}> New User</button>
        
          <button className="btn btn-right" onClick={() =>{navigate('/userLogin')}}>Existing User</button>
        </div>
      </div>

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
      </div>

      
      
    </div>
  )
}

export default UserCreation