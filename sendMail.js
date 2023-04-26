import Nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhurtyal8@gmail.com",
    pass: "gle123goo",
  },
});

let mailOptions = {
  from: "bhurtyal8@gmail.com",
  to: "abhurtya@ramapo.edu",
  subject: "New appointment booking",
  html: `<p><b>Name:</b> ${name}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Phone:</b> ${phone}</p>
                   <p><b>Date:</b> ${date}</p>
                   <p><b>Time:</b> ${time}</p>
                   <p><b>Note:</b> ${note}</p>`,
};
