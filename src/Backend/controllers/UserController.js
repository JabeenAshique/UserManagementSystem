class UserController {
    constructor(signupUserUseCase, loginUserUseCase) {
        this.signupUserUseCase = signupUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    async signup(req, res) {
        try {
            const { name,email, password } = req.body;
            console.log("Extracted Data:", { name, email, password });

            const result = await this.signupUserUseCase.execute({name, email, password });
            res.status(201).json({ message: "User registered successfully", result });
        } catch (error) {
            console.error("Error in signup:", error.message);

            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.loginUserUseCase.execute({ email, password });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController