const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");


const GOOGLE_CLIENT_ID =
  "1005860646938-j4ftsrjt2v77tj78ukirq2entncsjn7m.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

TWITTER_APP_ID = "your id";
TWITTER_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
    
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(
//   new TwitterStrategy(
//     {
//       clientID: TWITTER_APP_ID,
//       clientSecret: TWITTER_APP_SECRET,
//       callbackURL: "/auth/twitter/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});