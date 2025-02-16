import jwt from "jsonwebtoken";
import AdminRepository from "../frameworks/AdminRepository.js";
import Profile from "../entities/ProfileData.js";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

class AdminController {
    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async adminLogin(req, res) {
        const { email, password } = req.body;
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Unauthorized: Invalid credentials" });
        }
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.adminRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // async updateUser(req, res) {
    //     try {
    //         const { userId } = req.params;
    //         const updatedUser = await this.adminRepository.updateUser(userId, req.body);

    //         if (!updatedUser) {
    //             return res.status(404).json({ error: "User not found" });
    //         }

    //         res.status(200).json({ message: "User updated successfully", updatedUser });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
    async updateUser(req, res) {
        try {
            console.log("🔹 Received Data:", req.body);
            const { userId } = req.params;
            console.log("🔹 Received User ID for Update:", userId);
            console.log("🔹 Update Payload:", req.body);
    
            const updatedUser = await Profile.findOneAndUpdate(
                { _id: userId },
                {...req.body},
                { new: true } 
                
            );
    
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
    
            console.log("✅ Successfully Updated User:", updatedUser);
            res.status(200).json({ message: "User updated successfully", updatedUser });
        } catch (error) {
            console.error("❌ Error in updateUser:", error);
            res.status(500).json({ error: error.message });
        }
    }
    

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const deletedUser = await this.adminRepository.deleteUser(userId);
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await this.adminRepository.createUser(req.body);
            res.status(201).json({ message: "User created successfully", newUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default AdminController;
