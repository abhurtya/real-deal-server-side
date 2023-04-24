import cookieSession from "cookie-session";
import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// import "./passport";
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

// import authRoute from "./routes/auth";
import newsRoute from "./routes/news.js";
import propertyRoute from "./routes/property.js";

app.use(
  cookieSession({
    name: "session",
    keys: ["password"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);




// app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/properties", propertyRoute);

app.listen("8000", () => {
  connect();
  console.log("Server is running on 8000!");
});
