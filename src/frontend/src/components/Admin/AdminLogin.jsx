import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../Redux/Slices/adminSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3001/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("adminToken", data.token);
            dispatch(loginAdmin());
            navigate("/admin/dashboard");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;
