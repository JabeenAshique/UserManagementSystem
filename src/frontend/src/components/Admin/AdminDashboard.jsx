import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, deleteUser,logoutAdmin } from "../../Redux/Slices/adminSlice";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users) || [];
    const navigate = useNavigate();

    // Fetch users on mount
    useEffect(() => {
        fetch("http://localhost:3001/admin/dashboard", {
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        })
        .then(res => res.json())
        .then(data => dispatch(setUsers(data)))
        .catch(err => console.error("Error fetching users:", err));
    }, [dispatch]);

    // Handle delete user
    const handleDelete = async (userId) => {
        const response = await fetch(`http://localhost:3001/admin/delete-user/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });

        if (response.ok) {
            dispatch(deleteUser(userId));
            navigate(`/admin/dashboard`)
        } else {
            console.error("Error deleting user");
        }
    };
    const handleLogout = ()=>{
        dispatch(logoutAdmin())
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button className="add-user-btn" onClick={() => navigate("/admin/add-user")}>Add User</button>
            </div>

            {/* ✅ Large Summary Boxes */}
            <div className="dashboard-summary">
                <div className="summary-box users-box">Total Users: {users.length}</div>
            </div>

            {/* ✅ Users Table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.phoneNo}</td>
                            <td>
                                <button className="action-btn edit-btn" onClick={() => navigate(`/admin/edit-user/${user._id}`)}>Edit</button>
                                <button className="action-btn delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="action-btn delete-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
