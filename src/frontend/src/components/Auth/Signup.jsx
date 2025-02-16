import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Signup.css'
const Signup = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleData = async()=>{
    const response = await fetch ("http://localhost:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if(response.ok){
      alert("Signup successful, please login!");
      navigate("/")
    }else{
      alert(data.error)
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <input type="text" placeholder='name' onChange={(e)=>{setName(e.target.value)}}/>
      <input type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
      <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={handleData}>Submit</button>
    </div>
  )
}

export default Signup
