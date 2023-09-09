// const FacebookStrategy = require("passport-facebook").Strategy;
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "./models/user.js";

const GOOGLE_CLIENT_ID =
  "1005860646938-a3m9kpp4ks9g0rrtpsie5imf8c533kf3.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //if user exists

        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          currentUser.firstname = profile.name.givenName;
          currentUser.lastname = profile.name.familyName;
          currentUser.profileImage = profile.photos[0].value;
          currentUser.email = profile.emails[0].value;
          await currentUser.save();
          return done(null, currentUser);
        } else {
          //if user does not exist, create a new one
          const newUser = new User({
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            profileImage: profile.photos[0].value,
            email: profile.emails[0].value,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
