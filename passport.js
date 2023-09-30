/**/
/*
Passport Configuration for Google OAuth

NAME
    Google OAuth Authentication - Integrates Google OAuth into the application using Passport.

DESCRIPTION
    The code configures the GoogleStrategy provided by passport-google-oauth20 for authentication. 
    The primary function of this configuration is to handle the callback after Google has authenticated the user 
    and provide appropriate user creation or update mechanisms in our database. It also includes serialization 
    and deserialization methods for handling user sessions with Passport.

KEY VARIABLES
    - GOOGLE_CLIENT_ID: The client ID obtained from the Google Developer Console.
    - GOOGLE_CLIENT_SECRET: The client secret obtained from the Google Developer Console.
    - User: The user model from the MongoDB database.
    
PROCESS
    1. When Google authenticates a user, it redirects to the callbackURL specified.
    2. The code then checks if the user exists in our database.
    3. If the user exists, their details are updated. If not, a new user is created.
    4. Errors during this process are caught and logged.

SESSION HANDLING
    - serializeUser: Determines which user data should be stored in the session.
    - deserializeUser: Fetches the user data from the session when needed.
*/
/**/

// const FacebookStrategy = require("passport-facebook").Strategy;
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "./models/user.js";

const GOOGLE_CLIENT_ID =
  "1005860646938-a3m9kpp4ks9g0rrtpsie5imf8c533kf3.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// Setting up passport to use Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // this is the route that google will redirect to after authentication
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user already exists in our db with the given profile ID
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          // If user exists, update their details with the data from Google
          currentUser.firstname = profile.name.givenName;
          currentUser.lastname = profile.name.familyName;
          currentUser.profileImage = profile.photos[0].value;
          currentUser.email = profile.emails[0].value;
          await currentUser.save();
          return done(null, currentUser);
        } else {
          //if user does not exist, create a new one, record with the details from Google
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
        // Log and handle errors during the login/creation process
        console.log(err);
        return done(err, null);
      }
    }
  )
);

// Serialization ensures the user data can be stored as a session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialization retrieves user data from a stored session
passport.deserializeUser((user, done) => {
  done(null, user);
});
