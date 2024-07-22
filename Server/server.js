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
// const corsOptions = {
//   origin: 'https://pedopia.netlify.app',
//   optionsSuccessStatus: 200,
//   credentials: true // Allow credentials
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.use(express.json()); 

// app.use(session({
//     secret: secret,
//     resave: true,
//     saveUninitialized: true,
//     cookie:{secure :false}
//   }));
// const corsOptions = {
//   credentials: true // Allow credentials (cookies, authorization headers, etc.)
// };

const allowedOrigins = ['https://pedopia.netlify.app', 'http://localhost:3000', 'https://anotherdomain.com'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Pre-flight requests handling

app.use(express.json());

app.use(session({
  secret: secret, // Ensure you replace 'your_secret_key' with your actual secret
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true, // Set to true in production to ensure cookies are sent over HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite :'None'
  }
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
