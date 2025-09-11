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


const allowedOrigins = [
  "http://localhost:5173",
  "https://biosmaris.onrender.com",
  "*"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
); // Enable CORS


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
