
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/Slices/adminSlice";
import { useNavigate } from "react-router-dom";
import "./AddUser.css"

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        adhaarNo: "",
        phoneNo: "",
        address: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3001/admin/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newUser = await response.json();
                dispatch(addUser(newUser.newUser));
                navigate("/admin/dashboard");
            } else {
                console.error("Error creating user");
            }
        } catch (error) {
            console.error("❌ Error:", error);
        }
    };

    return (
        <div className="add-user-container">
            <h2>Add User</h2>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="text" name="adhaarNo" placeholder="Aadhaar No" onChange={handleChange} required />
            <input type="text" name="phoneNo" placeholder="Phone No" onChange={handleChange} required />
            <textarea name="address" placeholder="Address" onChange={handleChange} required></textarea>
            <button onClick={handleSubmit}>Create User</button>
        </div>
    );
};

export default AddUser;
