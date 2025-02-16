import Profile from "../entities/ProfileData.js";

class AdminRepository {
    async getAllUsers() {
        return await Profile.find(); 
    }

    async findUserById(userId) {
        return await Profile.findOne({ _id: userId });
    }

    async updateUser(userId, updateData) {
        return await Profile.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true } 
        );
    }

    async deleteUser(userId) {
        return await Profile.findOneAndDelete({ _id: userId });
    }

    async createUser(profileData) {
        try {
            const profile = new Profile(profileData);
            return await profile.save();
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
}

export default AdminRepository;
