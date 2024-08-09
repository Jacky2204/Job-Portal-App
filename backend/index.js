import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/dbConnection.js";
import auth from './Middlewares/Auth.js';
import errorHandler from './Middlewares/Error.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

// Connect Database
connectDB();



// Define Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);


// Error Handling Middleware
app.use(errorHandler);




