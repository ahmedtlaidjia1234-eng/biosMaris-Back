import express from "express";
import cors from "cors";
import helmet from "helmet";
// import morgan from "morgan";
import { PORT } from "./config/env.js";
import productRoute from "./routes/ProductsRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { connectDB, sequelize } from "./config/db.js";

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: "https://biosmaris.onrender.com/", // put your frontend link here
  }));         // Enable CORS
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
       // Security headers
// app.use(morgan("dev"));  // Logger

// Routes
// app.use("/api", router);
app.use("/api/products", productRoute);
app.use("/api/admin",adminRoute) 

// Start server
connectDB().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  });   
});
