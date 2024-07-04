const passport = require("../Config/PasswordAuth");
const User = require("../Model/user")

const express = require("express");
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/MainPage",
    failureRedirect: "/google/failure",
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google/failure" }),
  async function (req, res) {
    try {

      const token = req.user.token;


      const user = await User.findById(req.user.id);
      if (user) {
        user.token = token;
        await user.save();
      }

      res.redirect('/profile');
    } catch (error) {
      console.error("Error handling Google authentication callback:", error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
