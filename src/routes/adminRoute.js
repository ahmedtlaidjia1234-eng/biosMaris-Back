import express from "express";
import Admin from "../Models/admin.js";

const router = express.Router();

// 🔑 Login route
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    // always fetch the one admin (owner)
    const admin = await Admin.findOne({ where: { name: "owner" } });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found, please try again later." });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Password invalid" });
    }

    // update auth status
    await Admin.update({ auth: true }, { where: { name: "owner" } });

    // re-fetch to return updated object
    const updatedAdmin = await Admin.findOne({ where: { name: "owner",auth : true },attributes: { exclude: ["password"] },  });

    res.status(200).json({
      message: "Login successful",
      admin: updatedAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔒 Logout route
router.get("/logout", async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { name: "owner" } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await Admin.update({ auth: false }, { where: { name: "owner" } });

    const updatedAdmin = await Admin.findOne({ where: { name: "owner" } });

    res.status(200).json({
      message: "Logout successful",
      admin: updatedAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/editAdmin", async (req, res) => {

const { email , number } = req.body
  
  try {
    const admin = await Admin.findOne({ where: { name: "owner" } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await Admin.update({ email , number }, { where: { name: "owner" } });

    const updatedAdmin = await Admin.findOne({ where: { name: "owner" } });

    res.status(200).json({
      message: "edited successful",
      admin: updatedAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/getadminData",async (req,res)=>{
    try {
    const admin = await Admin.findOne({ where: { name: "owner" },attributes: { exclude: ["password"] } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "files passed successful",
      admin: admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})


router.post("/addadmin", async (req, res) => {
  try {
    
    const { name, password, email, phone } = req.body;
    const user = await Admin.create({ name, password, email, phone });
    res.status(201).json(user);
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default router;
