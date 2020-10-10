const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRouter');

const { requireAuth, checkUser } = require('./middlewares/authMiddleware');

const cors = require("cors");
const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
  };
  
app.use(cors(corsOptions.origin));

//middlewares
app.use(express.static('public'));
// app.use(express.urlencoded({extended: true})); //???
app.use(cookieParser());
app.use(express.json());



//view engine 
app.set('view engine', 'ejs'); 

//DB connection
const dbURI = 'mongodb+srv://guestBook:guestBook@cluster0.ngsao.mongodb.net/guestBook?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((res) => app.listen(3005))
.catch((err)=> console.log(err));

//routes
app.use(authRoutes);
app.use('/message', messageRoutes)