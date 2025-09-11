import express from "express";

const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to my Express.js backend 🚀" });
  console.log(res)
});




export default router; 
