import express from "express";
import Products from "../Models/Products.js";
import { where } from "sequelize";

const router = express.Router();

// ➡️ Create user (POST)
router.post("/addProduct", async (req, res) => {
  try {
   
    const { name, price, category, qrCode, description, images, ingredients, benefits, usage } = req.body;
    const user = await Products.create({ name, price, category, qrCode, description, images, ingredients, benefits, usage });
    res.status(201).json(user);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➡️ Get all users (GET)
router.get("/getProducts", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
router.put('/updateProduct',async (req,res)=>{
    const { name, price, category, qrCode, description, images, ingredients, benefits, usage } = req.body;
  
    try{
    const getSpecProd = await Products.findOne({qrCode})
    
    if(getSpecProd){
          const product = await Products.update({ name, price, category, qrCode, description, images, ingredients, benefits, usage }, {where: { qrCode }} );
      res.status(201).json(product);
    } 
  }
  catch (error) {
    res.status(400).json({ error: error.message }); 
  }

})
 
router.delete('/deleteProduct',async (req,res)=>{
    const {qrCode} = req.body;
    
  try{
    const getSpecProd = await Products.findOne({qrCode},{where : qrCode})
    
    if(getSpecProd){
          const product = await Products.destroy({where: { qrCode }} );
      res.status(201).json(product);
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

})

export default router;
