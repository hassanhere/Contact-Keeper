//CHECK LOGIN TO SEE IF USER IS AUTHENTIC OR NOT

const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const auth=require('../middleware/auth')
const {check,validationResult}=require('express-validator')


const User=require("../models/User_model")



//SHOWS YOU USER BASED ON JWT

router.get('/',auth,async(req,res)=>{
    
    try {
    
    const user=await User.findById(req.another_field.id).select('-password')

    res.json(user)
 

    } catch (error) {
    
        res.status(500).send('server error')

    }
    


})



//ALLOWS YOU TO LOGIN

router.post('/',[
    check('email','enter correct email').isEmail(),
    check('password','enter correct password').exists()
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }


    const {email,password}=req.body

    try {
        let user=await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({msg:"invalid credentials"})
        }


        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
            return res.status(400).json({msg:"invalid credentials"})
        }



 
        const payload={
            user:{
                id:user.id
            }
        }
    
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })

    } catch (error) {
        console.error(error.msg)
        res.status(500).send("server error")
    }
})

module.exports=router