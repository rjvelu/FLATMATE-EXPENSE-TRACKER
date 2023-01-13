import React from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout';
import { Form, Input } from 'antd'
import '../styles/Home.scss'


function Profile() {
  // states to capture the user related fields
  const [email, setEmail] = React.useState("")
  const [firstname, setFirstname] = React.useState("")
  const [lastname, setLastname] = React.useState("")
  const [monthly_budget, setMonthly_budget] = React.useState("")
  const [target_saving, setTarget_saving] = React.useState("")
  const [user1, setUser1] = React.useState(null)
  const [display, setDisplay] = React.useState("display_view_n")
  const [modal, setModal] = React.useState("hidden");
  const [flag,setFlag] = React.useState ("0");

  // get the child user values from the local storage
  const user = JSON.parse(localStorage.getItem("child-user"))
  React.useEffect(() => {
    setUser1(user)
    setEmail(user.email)
    setFirstname(user.firstName)
    setLastname(user.lastName)
    setMonthly_budget(user.monthly_budget)
    setTarget_saving(user.target_saving)

  }, [])

// triggers a backend call and updates the user values
  const edit_profile = async() => {

    try {
      const response = await fetch(`http://localhost:5001/user/${user._id}?`, {
          method: 'PUT',
          headers: {
              'Content-Type': "application/json"
          },
          body: JSON.stringify({
            firstName: firstname,
            LastName: lastname,
            email : email,
            target_saving: target_saving,
            monthly_budget: monthly_budget
          })
      });

  }
  catch (error) {

  }

  }

  return (
    // contains 2 form elements, 1 is hidden and will only be triggered when edit is called, which when used to edit the user 
    // data triggers the edit_profile function
    <DefaultLayout>


      <div className='row d-flex justify-content-center profile-form'>
        <div>
        
          <form className={`modal  ${display}`}>
          <div><button title="close" className='close-button' onClick={() =>{setFlag("0")}}> 
          <span>&#9587;</span></button>
          </div>
            <label>First name:</label><br />
            <input type="text" id="fname" name="fname" value={firstname} onChange={(e) =>{
              setFirstname(e.target.value)
            }} /><br />
            <label>Last name:</label><br />
            <input type="text" id="lname" name="lname" value={lastname}  onChange={(e) =>{
              setLastname(e.target.value)
            }}/><br />
            <label >Email:</label><br />
            <input type="text" value={email}  onChange={(e) =>{
              setEmail(e.target.value)
            }}/><br />
            <label>Monthly Budget:</label><br />
            <input type="text" value={monthly_budget}  onChange={(e) =>{
              setMonthly_budget(e.target.value)
            }}/><br />
            <label>Target Savings:</label><br />
            <input type="text" value={target_saving}  onChange={(e) =>{
              setTarget_saving(e.target.value)
            }}/><br />
            <button type='button' onClick={() => {
              setDisplay("display_view_n")
              edit_profile()
            }}> Save </button>
          </form>

        </div>


        <div className='d-flex justify-content-center '>
          <form >
            <label>First name:</label><br />
            <input type="text" id="fname" name="fname" value={firstname} readOnly /><br />
            <label>Last name:</label><br />
            <input type="text" id="lname" name="lname" value={lastname} readOnly /><br />
            <label >Email:</label><br />
            <input type="text" value={email} readOnly /><br />
            <label>Monthly Budget:</label><br />
            <input type="text" value={monthly_budget} readOnly /><br />
            <label>Target Savings:</label><br />
            <input type="text" value={target_saving} readOnly /><br />
            <button type='button' onClick={() => {

              setDisplay("display_view")
            }}> Edit </button>
          </form>
        </div>

      </div>
      <div class={`overlay ${display}`}></div>
    </DefaultLayout>
  )
}

export default Profile