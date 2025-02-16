
class createProfile{
    constructor(ProfileRepository,UserRepository){
        this.ProfileRepository = ProfileRepository;
        this.UserRepository = UserRepository
    }
    async getProfile(userId) {
        const user = await this.UserRepository.findById(userId);
        if (!user) throw new Error("User not found");

        const profile = await this.ProfileRepository.findByUserId(userId);
        if (!profile) throw new Error("Profile not found for this user");

        return profile;
    }

async execute({ userId, firstName, lastName, age, gender, adhaarNo, phoneNo, address, image }) {
    // Validate user existence
    const user = await this.UserRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if profile already exists
    const existingProfile = await this.ProfileRepository.findByUserId(userId);
    if (existingProfile) {
        throw new Error("Profile already exists for this user");
    }

    // Create and save profile
    const profile = await this.ProfileRepository.create({
        user: userId,
        firstName,
        lastName,
        age,
        gender,
        adhaarNo,
        phoneNo,
        address,
        image,  
    });

    return profile;
}

async update({ userId, firstName, lastName, age, gender, adhaarNo, phoneNo, address ,image}){
           const user = await this.UserRepository.findById(userId);
           if (!user) {
               throw new Error("User not found");
           }
       const existingProfile = await this.ProfileRepository.findByUserId(userId);
       if (!existingProfile) {
            throw new Error("Profile does not exist for this user");
           }
       const updateProfile = await this.ProfileRepository.updateByUserId(userId,{
           firstName,
           lastName,
           age,
           gender,
           adhaarNo,
           phoneNo,
           address,
           image
           
       });
       return updateProfile;
}
async delete({ userId }) {
    // Validate user existence
    const user = await this.UserRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if profile exists
    const existingProfile = await this.ProfileRepository.findByUserId(userId);
    if (!existingProfile) {
        throw new Error("Profile does not exist for this user");
    }

    // Delete the profile
    const deletedProfile = await this.ProfileRepository.deleteByUserId(userId);
    if (!deletedProfile) {
        throw new Error("Failed to delete the profile");
    }

    return { message: "Profile deleted successfully" };
}

    }
export default createProfile