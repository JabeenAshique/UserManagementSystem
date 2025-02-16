import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import adminRoutes from './routes/AdminRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


 app.use("/", userRoutes);
 app.use("/", adminRoutes);

export default app;
