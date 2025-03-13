import React from 'react'
import './NavBar.css'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router'
import { LoginContext } from "../LoginContext";
import { useContext } from 'react';
export default function NavBar() {

  const navigate = useNavigate()
  const handleRegister = ()=>{
    navigate("/Registration")
  }

  const handleLogin = ()=>{
    navigate("/")
  }


  const handleLogout = () => {
    Cookies.remove("token");
    handleLogin()
  };

  const handleAddNewJob = ()=>{
    navigate("/AddJob")
  }
  const { isLoggedIn } = useContext(LoginContext);

  

  return (
    <div className='navMain'>
        <div className='heading'><h3>Jobfinder</h3></div>
        {
          isLoggedIn ? <div id='detail'>
          <button id='logout' onClick={handleLogout}>Logout</button>
          <button onClick={handleAddNewJob} id='logout'>Add new Job</button>
          <p id='greet'>Hello! Recruiter</p>
          <div id='profilePic'></div>
        </div> :<div id='loginBtns'>
          <button id='loginButtons' onClick={handleLogin}>Login</button>
          
          <button id='registerButton' onClick={handleRegister}>Register</button>
        </div>
        }
        
    </div>
  )
}
