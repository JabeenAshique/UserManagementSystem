import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../Redux/Slices/profileSlice";
import './profileForm.css'
const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileData = useSelector((state) => state.profile.data);

    const [formData, setFormData] = useState(profileData || {});
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(profileData.image ? `http://localhost:3001/uploads/${profileData.image}` : null);

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file)); // ✅ Show preview
        }
    };

    // Handle form submission
    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const formDataToSend = new FormData();
        formDataToSend.append("userId", userId);
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("adhaarNo", formData.adhaarNo);
        formDataToSend.append("phoneNo", formData.phoneNo);
        formDataToSend.append("address", formData.address);
        if (selectedImage) {
            formDataToSend.append("image", selectedImage); // ✅ Append new image
        }

        try {
            const response = await fetch("http://localhost:3001/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                dispatch(editProfile(updatedProfile.profile));
                navigate("/profile");
            } else {
                console.error("Failed to update profile:", await response.json());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="create-profile-container">
            <h1>Edit Profile</h1>

            {/* Image Preview */}
            {preview && <img src={preview} alt="Profile Preview" width="100" className="profile-preview"/>}
            
            {/* File Input */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
            
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            
            <input type="text" name="adhaarNo" value={formData.adhaarNo} onChange={handleChange} />
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
            <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
            
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate("/profile")}>Cancel</button>
        </div>
    );
};

export default EditProfile;
