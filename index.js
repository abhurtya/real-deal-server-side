import cookieSession from "cookie-session";
import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
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

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/bookappt", (req, res) => {
  const { name, email, phone, date, time, note } = req.body;

  const msg = {
    to: "bhurtyalanish@gmail.com", 
    from: "abhurtya@ramapo.edu", 
    subject: "New appointment booking",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div style="font-family: Arial, sans-serif; color: #444;">
      <h2 style="color: #007bff;">New Appointment Booking</h2>
      <p style="margin: 0;">Hello Quack Quack,</p>
      <p style="margin: 0 0 20px;">A new appointment has been booked on your real estate website:</p>
      
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Name:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Email:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Phone:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Date:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${date}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Time:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${time}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px;">Note:</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${note}</td>
        </tr>
      </table>
      
      <p style="margin: 20px 0 0;">Thank you,</p>
      <p style="margin: 0;">Your Real Estate Team</p>
    </div>
  `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.use(
  cookieSession({
    name: "session",
    keys: ["password"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/properties", propertyRoute);

app.listen("8000", () => {
  connect();
  console.log("Server is running on 8000!");
});
