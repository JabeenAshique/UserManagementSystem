// src/routes/UserRoutes.js
import { Router } from "express";
import UserController from "../controllers/UserController.js";
import UserRepository from "../frameworks/UserRepository.js";
import SignupUser from "../usecases/SignupUser.js";
import LoginUser from "../usecases/LoginUser.js";
import profileRepository from "../frameworks/ProfileRepository.js";
import createProfile from "../usecases/createProfile.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";  
import upload from "../middlewares/uploadMiddlewares.js"; 


const router = Router();

const userRepository = new UserRepository();
const signupUserUseCase = new SignupUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, process.env.JWT_SECRET);
const userController = new UserController(signupUserUseCase, loginUserUseCase);
router.post("/signup", userController.signup.bind(userController));
router.post("/login", userController.login.bind(userController));
// router.post("/signup", (req, res) => userController.signup(req, res));
// router.post("/login", (req, res) => userController.login(req, res));

//Profile 


const ProfileRepository = new profileRepository();
const  CreateProfile = new createProfile(ProfileRepository,userRepository);
const profileController = new ProfileController(CreateProfile);
// router.post("/create", (req, res) => profileController.createProfile(req, res));
// router.get("/profile", (req, res) => profileController.getProfile(req, res));
// router.put("/update", (req, res) =>  profileController.updateProfile(req, res));
// router.delete("/delete", (req, res) =>  profileController.deleteProfile(req, res));
router.post("/profile",authMiddleware, upload.single("image"), (req, res) => profileController.createProfile(req, res));
router.get("/profile",authMiddleware, (req, res) => profileController.getProfile(req, res));  
router.put("/profile",authMiddleware, upload.single("image"), (req, res) => profileController.updateProfile(req, res));
router.delete("/profile",authMiddleware, (req, res) => profileController.deleteProfile(req, res));

export default router;
