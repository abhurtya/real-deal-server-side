
import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import './passport.js';

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
      secure: false
    }
    
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

app.listen("8000", () => {
  connect();
  console.log("Server is running on 8000!");
});
