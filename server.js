let express = require('express');
let app = express();
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let cors = require('cors');
const router = require('./routes/index.router.js');
require('dotenv').config()


let port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))
app.use(cookieParser())

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('Database Connected')
}).catch(()=>{
    console.log('Connection Failed')
})



app.use('/api', router);



app.listen(port, ()=>{
    console.log(`App is listening on http://localhost:${port}`)
})