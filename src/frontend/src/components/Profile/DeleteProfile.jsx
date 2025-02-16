import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../Redux/Slices/profileSlice';
import './deleteProfile.css'

const DeleteProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("User ID is missing in localStorage!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }), // ✅ Send userId in body
            });

            if (response.ok) {
                dispatch(deleteProfile());
                console.log("Profile deleted successfully!");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                navigate("/"); 
            } else {
                console.error("Failed to delete profile:", await response.json());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="delete-profile-container">
            <h2>Are you sure you want to delete your profile?</h2>
            <div className="delete-buttons">
            <button onClick={handleDelete} style={{ color: "red" }}>Delete Profile</button>
            <button onClick={() => navigate("/profile")}>Cancel</button>

            </div>
            
        </div>
    );
};

export default DeleteProfile;
