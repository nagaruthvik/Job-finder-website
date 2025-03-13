import React, { useState } from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";



export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "", 
    password: "",
  });


  const navigator = useNavigate()


  const onSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    try {
      const data = {
        name: formData.name,
        username :formData.name,
        email: formData.email,
        mobile: formData.number,
        password: formData.password,
      };
      const api = await fetch("http://localhost:4000/api/user/register",{
        method : "POST",
        headers :{
          "Content-Type":"application/json"
        },
        body : JSON.stringify(data)     
      })
      if(!api.ok){
        throw new Error(`HTTP error! Status: ${api.status}`)
      }
      const result = await api.json()
      window.alert("Account Created successfully!");
      navigator("/")
    } catch (error) {
      
      window.alert("Error during registration:",error)
    }
  }

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number" ? (value ? parseInt(value) : "") : value,
    }));
    
  };


  return (
    <div id="mainPage">
      <div id="sideCont">
        <form onSubmit={onSubmit} id="content">
          <h1 id="sideContentText">Create an account</h1>
          <p id="sideContentPara">Your personal job finder is here</p>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            className="input"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            className="input"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="number"
            value={formData.number}
            className="input"
            placeholder="Mobile"
            required
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="input"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <br />
          <span>
            <input type="checkbox" required />
            <p id="block">
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </span>
          <br />
          <input type="submit" id="signbtn" value="Sign in" />
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <div id="imageCont">
        <h1>Your Personal Job Finder</h1>
        <img src="./spaceman.png" alt="space" />
      </div>
    </div>
  );
}
