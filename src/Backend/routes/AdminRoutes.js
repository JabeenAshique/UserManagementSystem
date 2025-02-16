import { Router } from "express";
import AdminController from "../controllers/AdminController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";  
import AdminRepository from "../frameworks/AdminRepository.js";

const router = Router();
const adminController = new AdminController(new AdminRepository());

router.post("/admin/login", (req, res) => adminController.adminLogin(req, res));

router.get("/admin/dashboard", authMiddleware, (req, res) => adminController.getAllUsers(req, res));

router.put("/admin/update-user/:userId", (req, res) => adminController.updateUser(req, res));

router.delete("/admin/delete-user/:userId", authMiddleware, (req, res) => adminController.deleteUser(req, res));

router.post("/admin/create-user", authMiddleware, (req, res) => adminController.createUser(req, res));

export default router;
