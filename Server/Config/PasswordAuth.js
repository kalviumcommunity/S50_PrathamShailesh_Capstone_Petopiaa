const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const jwt = require('jsonwebtoken');
const User = require('../Model/user')
require('dotenv').config();


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },


  async function authenticate(request, accessToken, refreshToken, profile, done) {
    // console.log("hello")
    try {
        let user = await User.findOne({ google_id: profile.id });
        // console.log(profile.picture)
        if (!user) {
            user = new User({
                google_id: profile.id, 
                User_Name: profile.displayName,
                Email: profile.emails[0].value,
                Display_Picture: profile.picture
            });
            await user.save();
        }
        const token = jwt.sign(
            { userId: user._id, email: user.Email }, 
            process.env.Jwt_Secret_key, 
            { expiresIn: '1h' } 
          );
       
        return done(null, { 
            id: user._id,
            User_Name: user.User_Name,
            Email: user.Email,
            Display_Picture: user.Display_Picture,
            token
        });
    } catch (error) {
        return done(error);
    }
}
)
);

module.exports = passport;
