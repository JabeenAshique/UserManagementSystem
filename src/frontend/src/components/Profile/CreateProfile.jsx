import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setProfile} from '../../Redux/Slices/profileSlice.js'
import './profileForm.css'
function CreateProfile() {
    const [formData,setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        adhaarNo: "",
        phoneNo: "",
        address: "",
        image: null,
      });
      const [preview, setPreview] = useState(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
      }
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file)); // ✅ Show preview
        }
    };
    
      const handleSubmit = async () =>{
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            console.log(userId);
            
            const requestBody = {
                ...formData,
                userId: userId,
            };
            const response = await fetch("http://localhost:3001/profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(requestBody ),
            });
      
            if (response.ok) {
              const Data = await response.json();
              dispatch(setProfile(Data.data));
              console.log("created succesfully") 
              navigate("/profile");
            } else {
              console.error("Error creating profile:", await response.json());
            }
          } catch (error) {
            console.error("Error:", error);
          }
      }

  return (
    <div className="create-profile-container">
      <h1>Create Profile</h1>
      {preview && <img src={preview} alt="Profile Preview" width="100" className="profile-preview" />}

    <input type="file" accept="image/*" onChange={handleImageChange} />      
    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="text" name="adhaarNo" placeholder="Aadhaar No" onChange={handleChange} />
      <input type="text" name="phoneNo" placeholder="Phone No" onChange={handleChange} />
      <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CreateProfile
