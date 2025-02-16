import Profile from "../entities/ProfileData.js";

class profileRepository {
    async findByUserId(UserId){
        return Profile.findOne({user:UserId}).populate("user");
    }
    async create(profiledata){
        try {
            const profile = new Profile(profiledata);
            const savedProfile = await profile.save();
            console.log("Profile Saved:", savedProfile); 
            return savedProfile;
        } catch (error) {
            console.error("Error saving profile:", error); 
            throw error; 
        }
    }
    async updateByUserId(userId, updateData) {
        return await Profile.findOneAndUpdate(
            { user: userId },
            updateData,
            { new: true } 
        );
    }
    

    async deleteByUserId(userId) {
        return Profile.findOneAndDelete({ user: userId });
    }
    async delete({ userId }) {
    // Validate user existence
    const user = await this.UserRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const existingProfile = await this.ProfileRepository.findByUserId(userId);
    if (!existingProfile) {
        throw new Error("Profile does not exist for this user");
    }

    
    const deletedProfile = await this.ProfileRepository.deleteByUserId(userId);
    if (!deletedProfile) {
        throw new Error("Failed to delete the profile");
    }

    return { message: "Profile deleted successfully" };
}


}
export default profileRepository