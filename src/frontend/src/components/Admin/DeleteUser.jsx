import React from "react";
import "./DeleteUser.css"

const DeleteUser = ({ user, fetchUsers, setAction }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(`http://localhost:3001/admin/delete-user/${user._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            fetchUsers();
            setAction(null);
        } else {
            console.error("Failed to delete user");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="delete-modal">
                <h2>Are you sure you want to delete {user.firstName}?</h2>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
                <button className="cancel-btn" onClick={() => setAction(null)}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteUser;
