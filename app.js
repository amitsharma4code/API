
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb=require('./db/connectdb')
const web=require('./routes/web')
const cors=require('cors')
const bodyParser=require('body-parser')
const fileUpload = require("express-fileupload")
const cloudinary=require('cloudinary')

//get token
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

dotenv.config({
    path: '.env'
})

//database connection
connectdb()

//router connection
app.use('/api',web)

//  body parser
app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.urlencoded({extended:false}))

  //image upload
app.use(fileUpload({useTempFiles: true}));
app.use(cors())

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
}) 
