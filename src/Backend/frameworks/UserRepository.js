import User from "../entities/User.js";

class UserRepository {
    async findById(userId) {
        return User.findById(userId);
    }

    async findByEmail(email){
        return User.findOne({email});
    }

    async save(userData) {
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) throw new Error("Email already exists");
        const user = new User(userData);
        return user.save();
    }
    
}

export default UserRepository