const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User_model");
const Contact = require("../models/Contact_model");

router.get("/", auth, async (req, res) => {
  try {
    let contacts = await Contact.find({ user: req.another_field.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  [auth, [check("name", "name is required").notEmpty()]],
  async(req, res) => {
   
    console.log(req.body)
    const errors=validationResult(req)
    console.log("line 28",req.another_field.id)




    if(!errors.isEmpty())
    {
      console.log("line 35")
        return res.status(400).json({errors:errors.array()})
    }
    console.log("line 38")
    const {name,email,phone ,type}=req.body;

    try {
        const newcontact=new Contact({
            name:name,
            email:email,
            phone:phone,
            type:type,
            user:req.another_field.id
        })
        
        const contact=await newcontact.save()
        

        res.send(contact)

    } catch (error) {
        console.error(error.message)
        res.send("server error")
    }

  }
);

router.put("/:id",auth, async(req, res) => {
  
  try {

    const contact_verify=await Contact.findById(req.params.id)

    if(contact_verify.user.toString()!==req.another_field.id)
    {
      return res.send("Unauthorized Personnel-Access Denied")
    }

    let updated_contact=await Contact.findByIdAndUpdate(req.params.id,req.body,{
      new:true
    })
  
    res.send(updated_contact)

  } catch (error) {
    console.log(error.message)
    res.send("server error") 
  }






});

router.delete("/:id",auth,async(req, res) => {


  try {

    const contact_verify=await Contact.findById(req.params.id)

    if(contact_verify.user.toString()!==req.another_field.id)
    {
      return res.send("Unauthorized Personnel-Access Denied")
    }

    let delete_contact=await Contact.findByIdAndDelete(req.params.id)
  
    res.send(delete_contact)

  } catch (error) {
    console.log(error.message)
    res.send("server error") 
  }




});

module.exports = router;
