import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}; 
startServer();
