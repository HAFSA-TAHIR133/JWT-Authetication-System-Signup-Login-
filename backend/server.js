import express from "express";
import cors from "cors";
// import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import xss from "xss-clean";
import morgan from "morgan";

import userRoutes from './routes/userRoutes.js';
import errorHandler from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan("dev"));

// app.use(helmet());
// app.use(xss());
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true                
}));

app.use(express.json());
app.use(cookieParser());

const limiter =rateLimit({
  windowMs:5*60*1000,
  limit:100,
  message:"Too many request."
});
app.use(limiter);

// API Versioning
app.use('/api/v1/users', userRoutes);

// middleware errorhandle
app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
