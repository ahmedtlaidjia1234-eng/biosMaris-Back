import express from "express";
import Contact from "../Models/contact.js";

const router = express.Router();

// Example route
router.post("/addMessage", async (req, res) => {
  

  try{
    const {nom ,email ,phone ,sujet ,message} = req.body
const contact = await Contact.create({nom ,email ,phone ,sujet ,message});
  res.status(200).json(contact);
  }catch(err){
    res.status(400).json(err)
  }
  

});

router.get("/list", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/deletemessage',async (req,res)=>{
    const {id} = req.body;
    
  try{
    const getSpecProd = await Contact.findOne({id},{where : id})
    
    if(getSpecProd){
          const deleteMessage = await Contact.destroy({where: { id }} );
      res.status(201).json(deleteMessage);
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

})


router.put('/updatemessage',async (req,res)=>{
    const { email } = req.body;
  console.log(req.body)
    try{
    const getmessage = await Contact.findOne({email},{where : email})
    
    if(getmessage){
          const updateLu = await Contact.update({ read : true }, {where: { email }} );
         
      res.status(201).json(updateLu);
    } 
  }
  catch (error) {
    res.status(400).json({ error: error.message }); 
  }

})

export default router;  