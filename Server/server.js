const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userroute=require('./Routes/user')
const authroute=require('./Routes/auth')
const petroute=require("./Routes/pet")
const chat=require("./Routes/chat")
const connectDatabase = require('./Config/Database');
const authenticateToken=require("./Routes/authenticateToken")
const passport = require("passport");
const session = require('express-session');
require('dotenv').config();

const secret = process.env.Secret
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDatabase();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pedopia.netlify.app/"],
    credentials: true,
  })
);
app.use(express.json()); 

app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie:{secure :false}
  }));

app.use(passport.initialize());
app.use(passport.session());





app.use('/users',userroute)
app.use('/rehome',petroute)
app.use("/auth",authroute)
app.use("/chat",chat)


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
