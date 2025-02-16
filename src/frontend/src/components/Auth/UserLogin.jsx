import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/authSlice"; 
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'



const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClick = async ()=>{
    const response = await fetch("http://localhost:3001/login",{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email,password})
    })
    const data = await response.json();
    if(response.ok){
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId",data.userId)
      dispatch(login(data))
      console.log("Login Successful:", data);
      navigate("/profile")

    }else{
      dispatch()
    }
  }
  return (
    <div className="login-container">
    <h1>Login</h1>
    <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />      
    <input type="text" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
    <button onClick={handleClick}>Submit</button>
    <p>New user? <span onClick={() => navigate("/signup")} style={{color: "blue", cursor: "pointer"}}>Sign up</span></p>
    </div>
  )
}

export default Login
