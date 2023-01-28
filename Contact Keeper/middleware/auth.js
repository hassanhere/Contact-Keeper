const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=function(req,res,next){
    
    console.log("middleware")
    console.log(req.body)
    console.log("..........................")
    //GET TOKEN FROM HEADER
    const token=req.header('x-auth-token')
    console.log(token)
    //CHECK IF NOT TOKEN
    if(!token)
    {
        return  res.status(401).json({msg:"no token, authorization required"})
    }

    try {
        
        const decoded=jwt.verify(token,config.get('jwtSecret'))
        req.another_field=decoded.user
   

        next()


    } catch (error) {
        
        res.status(401).json({msg:"token is invalid"})

    }
}