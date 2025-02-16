class SignupUser {
    constructor (userRepository){
        this.userRepository=userRepository
    }
async execute({name,email,password}){
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("Email is already in use");
    }
    const user = await this.userRepository.save({name, email, password });
    return { name:user.name, userId: user._id, email: user.email };
}
}

export default SignupUser