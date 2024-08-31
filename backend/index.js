const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Router = require('./routes/index')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
require('dotenv').config()
app.use(cors())


app.get('/', (req, res)=>{
    res.send('The backend is responding well!!')
})

app.use(process.env.APP_USER_ROUTE, Router)
app.use(process.env.APP_TRANSACTION_ROUTE, Router)
app.use(process.env.APP_REFERRAL_ROUTE, Router)
app.use(process.env.APP_WALLET_ROUTE, Router)
app.use(process.env.APP_SUPPORT_ROUTE, Router)





app.listen(5000, ()=>{
    console.log('Server is running on port 5000')
})

mongoose.connect(process.env.MONGODB_URL)
  .then(() =>{
    console.log('DB Connected!!!')
  })
  .catch(()=>{
    console.log("connection failed")
})