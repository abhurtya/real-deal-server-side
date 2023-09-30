/*
Express Application Setup
NAME
    Express Application - Configuration and initialization of an Express.js server.
SYNOPSIS
    The code initializes an Express server, connects to MongoDB, sets up middleware, and routes.
DESCRIPTION
    This code sets up an Express.js application with various middleware, MongoDB connection, and route configurations. 
    It ensures the app is ready to receive and respond to HTTP requests.
MIDDLEWARE USED
    - dotenv: Loads environment variables from a .env file.
    - express.json: Parses incoming requests with JSON payloads.
    - cors: Enables Cross-Origin Resource Sharing (CORS) configuration for the app.
    - session: Session middleware to manage user sessions.
    - passport: Initialize and handle authentication using Passport.
    - passport.session: Middleware to ensure Passport handles session management.
ROUTES
    The app defines routes for authentication, news, properties, email sending, and geocoding.
    - /auth: Routes related to authentication processes.
    - /news: Routes for news-related operations.
    - /properties: Routes for property-related operations.
    - / (root): Routes for sending emails.
    - /geocode: Routes for geocoding operations.
EXPORT
    The code doesn't explicitly export anything, but the server starts listening on port 8000.
*/

import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import "./passport.js";

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

import authRoute from "./routes/auth.js";
import newsRoute from "./routes/news.js";
import propertyRoute from "./routes/property.js";
import sendMailRoute from "./routes/sendMail.js";
import geocodeRoute from "./routes/geocode.js";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "Duck",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

//The order of middlewares is important in Express.js.
// Generally, you'll want to initialize Passport and the session middleware before defining your routes.
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/properties", propertyRoute);
app.use("/", sendMailRoute);
app.use("/geocode", geocodeRoute);

app.listen("8000", () => {
  connect();
  console.log("Server is running on 8000!");
});
