class ProfileController {
    constructor(CreateProfile) {
        this.CreateProfile = CreateProfile;
    }

    async createProfile(req, res) {
        try {
            const { userId, firstName, lastName, age, gender, adhaarNo, phoneNo, address } = req.body;
            const image = req.file ? req.file.filename : null;
            const profile = await this.CreateProfile.execute({
                userId,
                firstName,
                lastName,
                age,
                gender,
                adhaarNo,
                phoneNo,
                address,
                image
            });

            res.status(201).json({ message: "Profile created successfully", profile });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user?.id || req.headers.userid;
          const profile = await this.CreateProfile.getProfile(userId);

          res.status(200).json(profile);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    async updateProfile(req, res) {
        try {
            const { userId, firstName, lastName, age, gender, adhaarNo, phoneNo, address } = req.body;
            const image = req.file ? req.file.filename : req.body.image;
           
            const profile = await this.CreateProfile.update({
                userId,
                firstName,
                lastName,
                age,
                gender,
                adhaarNo,
                phoneNo,
                address,
                image
            });

            res.status(201).json({ message: "Profile updated successfully", profile });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteProfile(req, res) {
        try {
            const { userId } = req.body;
            const response = await this.CreateProfile.delete({ userId });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
   
    
}

export default ProfileController;
