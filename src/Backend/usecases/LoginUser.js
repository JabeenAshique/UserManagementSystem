import { compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

class LoginUser {
    constructor(userRepository, jwtSecret) {
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }

    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Invalid email or password");

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid email or password");

        const token = sign({ id: user._id, email: user.email }, this.jwtSecret, {
            expiresIn: "1h",
        });

        return { token, userId: user._id };
    }
}

export default LoginUser;
