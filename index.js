const express=require('express');
const app = express();
const mongoose =require('mongoose');
const env = require('dotenv').config()
// dotenv.config();


//IMPORT ROUTEs
const loginRoute =require('./routes/Login');


// DB connection
mongoose.connect("mongodb+srv://akash03:Akashkumar@cluster0-bpmrx.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true },
    
    ()=> console.log("Connected to DB.....!"));


// Middleware
app.use(express.json());
//ROUTE middleware
app.use('/',loginRoute);

// app.use('/app/notes',loginRoute);

 



//PORT INITIONION

app.listen(8080,()=>console.log('Server running and ready to use'));
    