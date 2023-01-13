import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import PLogin from './pages/PLogin';
import PRegister from './pages/PRegister';
import UseCreation from './pages/UserCreation'
import NewUser from './pages/NewUser';
import UsersLogin from './pages/UsersLogin'
import Verify from './pages/verify';
import Reset from './pages/reset';
import PasswordReset from './pages/passwordreset';
import Home from './pages/Home';
import Groupexpense from './pages/Groupexpense';
import Profile from './pages/Profile'
import Child_reset from './pages/Child_reset';
import Child_passwordreset from './pages/Child_passwordreset';

// app is using for routing purposes, it routes to different pages based on path
function App() {
  return (
    <div className="App">
    <BrowserRouter>
 {/* routes */}
<Routes>

  <Route path='/' element={<ProtectedRoute1><PLogin/></ProtectedRoute1>}/>
  <Route path='/login' element={<ProtectedRoute1><PLogin/></ProtectedRoute1>}/>
  <Route path='/register' element={<ProtectedRoute1><PRegister/></ProtectedRoute1>}/> 
  <Route path='/choose' element={<ProtectedRoute><UseCreation/></ProtectedRoute>}/> 
  <Route path='/newUser' element={<ProtectedRoute><NewUser/></ProtectedRoute>}/> 
  <Route path='/userLogin' element={<ProtectedRoute><UsersLogin/></ProtectedRoute>}/>
  <Route path ='/verify' element = {<ProtectedRoute><Verify/></ProtectedRoute>}/>
  <Route path ='/reset' element = {<Reset/>}/>
  <Route path ='/passwordreset/:id/:token' element = {<PasswordReset/>}/>
  <Route path ='/childreset' element = {<ProtectedRoute><Child_reset /></ProtectedRoute>}/>
  <Route path ='/passwordreset/child/:id/:token' element = {<ProtectedRoute><Child_passwordreset/></ProtectedRoute>}/>
  <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
  <Route path = '/group' element={<ProtectedRoute><Groupexpense/></ProtectedRoute>} />
  <Route path = '/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />




</Routes>

</BrowserRouter>
    </div>
  );
}
// this protected route is to not let the user go to other pages without logging in
export function ProtectedRoute(props){
  // console.log(props)

  if(localStorage.getItem('parent-user')){
    return props.children
  }else{
    return <Navigate to='/login' />
  }
}

// this protected routes doesnt let the user visit the login/registeration pages without logging out
export function ProtectedRoute1(props){

  // console.log(props)



  if(!(localStorage.getItem('parent-user'))){

    return props.children

  }else{

    return <Navigate to='/home' />

  }

}


export default App;
