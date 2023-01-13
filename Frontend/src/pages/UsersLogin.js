import React from 'react'
import NewUserCompo from '../components/NewUserCompo'
import axios from 'axios'
import '../styles/NewUser.scss'
import '../styles/Newusercompo.scss'

function UsersLogin() {
    const [users,setUsers] = React.useState(null);


// getting all the users and setting the password field to null
    const pull = async() =>{
        const parent =  JSON.parse( localStorage.getItem('parent-user'));
        const resp = await fetch(`http://localhost:5001/user/${parent._id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
        });
      
        const response = await resp.json()
        setUsers(response)
        response.map((data) =>{data.password=""})
        localStorage.setItem('all-users',JSON.stringify({...response})) 
        

    }
    // user creation using the newusercomp component
    const creation = () =>{
        return users.map((users,i) => {
            return (<NewUserCompo Key={i} users={users} > </NewUserCompo>)
        })

    }


    React.useEffect(()=>{
        pull();
        
    },[])
  return (
    <div className='NewUserForm '>
    <div className='users-flex'>
    {/*when users exists it triggers the creation function */}
        {users && creation()}

    </div>
    </div>
  )
}

export default UsersLogin
