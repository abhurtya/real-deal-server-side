import express from "express";
import sgMail from "@sendgrid/mail";
const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/bookappt", (req, res) => {
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

router.post("/requestlisting", (req, res) => {
  const {
    propertyType,
    propertyHistory,
    neighbourBenefits,
    isWalkable,
    hasSchoolsNearby,
    firstName,
    lastName,
    email,
    phone,
  } = req.body;

  const msg = {
    to: "bhurtyalanish@gmail.com",
    from: "abhurtya@ramapo.edu",
    subject: "New Property Listing Request",
    text: "and easy to do anywhere, even with Node.js",
    html: `
      <h2>New Property Listing Request</h2>
      <p>Hello Real Estate Team,</p>
      <p>A new property listing has been requested on your website:</p>
      <table>
        <tr>
        <td><b>First Name:</b></td>
        <td>${firstName}</td>
        </tr>
        <tr>
        <td><b>Last Name:</b></td>
        <td>${lastName}</td>
        </tr>
        <tr>
        <td><b>Email:</b></td>
        <td>${email}</td>
        </tr>
        <tr>
        <td><b>Phone:</b></td>
        <td>${phone}</td>
        </tr>
        <tr>
          <td><b>Property Type:</b></td>
          <td>${propertyType}</td>
        </tr>
        <tr>
          <td><b>Property History:</b></td>
          <td>${propertyHistory}</td>
        </tr>
        <tr>
          <td><b>Neighbour Benefits:</b></td>
          <td>${neighbourBenefits}</td>
        </tr>
        <tr>
          <td><b>Is Walkable:</b></td>
          <td>${isWalkable}</td>
        </tr>
        <tr>
          <td><b>Has Schools Nearby:</b></td>
          <td>${hasSchoolsNearby}</td>
        </tr>
   
      </table>
      <p>Thank you for your attention,</p>
      <p>Your Real Estate Team</p>
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

export default router;
