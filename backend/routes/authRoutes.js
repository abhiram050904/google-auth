const express=require('express')
const { googleLogin } = require('../controller/authController')

const router=express.Router()

router.get('/google',googleLogin)

module.exports=router