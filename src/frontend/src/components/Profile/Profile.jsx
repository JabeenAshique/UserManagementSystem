

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile,logout } from "../../Redux/Slices/profileSlice";
import { useNavigate } from "react-router-dom";
import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.data);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // ✅ Fix typo ("useId" to "userId")

      if (!token || !userId) {
        console.error("No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setProfile(data));
        } else {
          console.warn("Profile not found, user needs to create one.");
          dispatch(setProfile(null));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // ✅ Ensure loading state is updated
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to homepage
  };
  if (loading) {
    return <h2>Loading...</h2>; // ✅ Prevent UI flickering
  }

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      {profileData ? (
        <div >
          <h3>Your Profile</h3>
          <img
            src={
              profileData.image
                ? `http://localhost:3001/uploads/${profileData.image}`
                : "/default-image.png"
            }
            alt="Profile"
            width="100"
            className="profile-image"
            />
          <p><strong>Name:</strong> {profileData.firstName} {profileData.lastName}</p>
          <p><strong>Age:</strong> {profileData.age}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Aadhaar No:</strong> {profileData.adhaarNo}</p>
          <p><strong>Phone No:</strong> {profileData.phoneNo}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <div className="profile-buttons">
          <button  className="edit-button" onClick={() => navigate("/edit-profile")}>Edit</button>
          <button className="delete-button" onClick={() => navigate("/delete-profile")} >
            Delete Profile
          </button>
          </div>
         
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate("/create-profile")}>
          Create Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
