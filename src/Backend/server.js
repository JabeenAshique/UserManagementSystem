import "dotenv/config";
import connectDB from "./frameworks/Database.js";
import app from "./app.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3001;

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
