const express=require('express')
const dotenv=require('dotenv')
const app=express()
const cors = require('cors');
const authRoutes=require('./routes/authRoutes')
const { default: mongoose } = require('mongoose')

dotenv.config()
const port=process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/auth',authRoutes)

app.listen(port,()=>{
    console.log("app is running on port:",port)
})

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('database connected successfully')
}
    
)
.catch((err)=>{
    console.log(err)
}
)