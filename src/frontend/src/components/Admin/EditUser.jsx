import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../Redux/Slices/adminSlice";
import "./AddUser.css"

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams(); // ✅ Get userId from URL params
    const users = useSelector((state) => state.admin.users); // ✅ Get users from Redux store
    // console.log(users)

    const [formData, setFormData] = useState({
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

    // ✅ Load user data into form on mount
    // useEffect(() => {
    //     console.log("🔹 Users from Redux:", users);
    //     console.log("🔹 URL userId:", userId); 
    
    //     if (!users || !Array.isArray(users)) {
    //         console.error("🚨 Users list is empty or not an array!");
    //         return;
    //     }
    
    //     const selectedUser = users.find(user => user._id === userId);    
    //     if (selectedUser) {
    //         setFormData({
    //             _id: selectedUser._id,  
    //             firstName: selectedUser.firstName || "",
    //             lastName: selectedUser.lastName || "",
    //             age: selectedUser.age || "",
    //             gender: selectedUser.gender || "",
    //             adhaarNo: selectedUser.adhaarNo || "",
    //             phoneNo: selectedUser.phoneNo || "",
    //             address: selectedUser.address || "",
    //             image: selectedUser.image || null,
    //         });
    
    //         if (selectedUser.image) {
    //             setPreview(`http://localhost:3001/uploads/${selectedUser.image}`);
    //         }
    //     } else {
    //         console.error("🚨 User not found:", userId);
    //     }
    // }, [users, userId]);
    
    // // ✅ Handle input field changes
    // // const handleChange = (e) => {
    // //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // // };
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(`📝 Updating formData.${name}:`, value); // Debugging log
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    //     console.log("handle",formData);
        
    // };
    

    useEffect(() => {
        console.log("🔹 Users from Redux:", users);
        console.log("🔹 URL userId:", userId);
    
        if (!users || !Array.isArray(users)) {
            console.error("🚨 Users list is empty or not an array!");
            return;
        }
    
        const selectedUser = users.find(user => user._id === userId);
        if (selectedUser) {
            setFormData((prev) => ({
                ...prev, // ✅ Keeps any existing state changes
                _id: selectedUser._id,
                firstName: selectedUser.firstName || "",
                lastName: selectedUser.lastName || "",
                age: selectedUser.age || "",
                gender: selectedUser.gender || "",
                adhaarNo: selectedUser.adhaarNo || "",
                phoneNo: selectedUser.phoneNo || "",
                address: selectedUser.address || "",
                image: selectedUser.image || null,
            }));
    
            if (selectedUser.image) {
                setPreview(`http://localhost:3001/uploads/${selectedUser.image}`);
            }
        } else {
            console.error("🚨 User not found:", userId);
        }
    }, [users,userId]); // ✅ Removed dependency on `users`
    
  const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`📝 Updating formData.${name}:`, value); // Debugging log
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        
    };

    // ✅ Handle file input changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file)); 
        }
    };
    const handleUpdate = async () => {
        try {
            const selectedUser = users.find(user => user._id === userId);
            if (!selectedUser) {
                console.error("Error: User not found in Redux Store!");
                return;
            }
    
            const actualUserId = selectedUser._id;
           // console.log("API Request to update user:", actualUserId);
    
            // const formDataObj = new FormData();
            // if (formData.firstName) formDataObj.append("firstName", formData.firstName);
            // if (formData.lastName) formDataObj.append("lastName", formData.lastName);
            // if (formData.age) formDataObj.append("age", formData.age);
            // if (formData.gender) formDataObj.append("gender", formData.gender);
            // if (formData.adhaarNo) formDataObj.append("adhaarNo", formData.adhaarNo);
            // if (formData.phoneNo) formDataObj.append("phoneNo", formData.phoneNo);
            // if (formData.address) formDataObj.append("address", formData.address);
            const formDataToSend = new FormData();
            formDataToSend.append("userId", userId);
            formDataToSend.append("firstName", formData.firstName);
            formDataToSend.append("lastName", formData.lastName);
            formDataToSend.append("age", formData.age);
            formDataToSend.append("gender", formData.gender);
            formDataToSend.append("adhaarNo", formData.adhaarNo);
            formDataToSend.append("phoneNo", formData.phoneNo);
            formDataToSend.append("address", formData.address);
            
    
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`Sending ${key}:`, value);
            }
            console.log("form0:",formDataToSend)
            const token = localStorage.getItem("adminToken");
            if (!token) {
                console.error("Error: Admin token is missing!");
                return;
            }
            console.log("📝 Before API Call - formData:", Object.fromEntries(formDataToSend));
            const response = await fetch(`http://localhost:3001/admin/update-user/${actualUserId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend, 
            });
    
            const data = await response.json();
            console.log("Full API Response:", data);
    
            if (!response.ok) {
                console.error("API Error:", data);
                return;
            }
    
            if (data.updatedUser) {
                dispatch(editUser(data.updatedUser)); 
                navigate("/admin/dashboard"); 
            } else {
                console.error(" Error: `updatedUser` is missing in API response!");
            }
    
        } catch (error) {
            console.error(" Error updating user:", error);
        }
    };
    

    
    return (
        <div  className="add-user-container">
            <h1>Edit User</h1>
            {preview && <img src={preview} alt="Profile Preview" width="100" />}

            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="text" name="adhaarNo" placeholder="Aadhaar No" value={formData.adhaarNo} onChange={handleChange} />
            <input type="text" name="phoneNo" placeholder="Phone No" value={formData.phoneNo} onChange={handleChange} />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate("/admin/dashboard")}>Cancel</button>
        </div>
    );
};

export default EditUser;


