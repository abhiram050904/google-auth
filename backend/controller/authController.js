
const User = require('../models/usermodel')
const {oauth2client}=require('../utils/googleConfig')
const jwt=require('jsonwebtoken')
const axios = require('axios'); 

const googleLogin=async(req,res)=>{
    try{

        const {code}=req.query
        const googleRes=await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens)


        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const {email,name,picture}=userRes.data

        let user=await User.findOne({email})
        if(!user){
            user=await User.create({name,email,image:picture})

        }
        const {_id}=user
        const token=jwt.sign({_id,email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})

        return res.status(200).json({
            message:'success',
            token,
            user
        })
    }
    catch(err){
        res.status(500).json({message:'internal error'})
        console.log("error:",err)
    }
}

module.exports={googleLogin}