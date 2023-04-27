
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb=require('./db/connectdb')
const web=require('./routes/web')
const cors=require('cors')
const bodyParser=require('body-parser')
const fileUpload = require("express-fileupload")
var session = require('express-session')
var flash = require('connect-flash');

//  body parser
//app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

//get token
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

dotenv.config({
    path: '.env'
})
app.use(fileUpload({useTempFiles: true}));
app.use(cors())
//image upload
app.use(fileUpload({useTempFiles:true}));

//message upload
app.use(session({
   secret: 'secret',
   cookie: { maxAge: 60000 },
   resave: false,
   saveUninitialized: false,
   
 }));
 app.use(flash());
 


//database connection
connectdb()

//router connection
  app.use('/api',web)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
}) 
