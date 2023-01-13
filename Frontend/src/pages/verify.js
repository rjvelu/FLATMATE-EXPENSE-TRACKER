import React from 'react'
import {useNavigate} from 'react-router-dom'

// verification page layout
function Verify() {

    const navigate = useNavigate();

    return (
        <div>
            <p>An email is sent to Your email , Please verify it  </p>
            <button onClick= {()=>{navigate('/login')}}>  Ok </button> 
        </div>
    );

}

export default Verify