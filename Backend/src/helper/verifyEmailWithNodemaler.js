const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});

const emailVerifyWithNodemaler = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    console.error("Error occured while mail sending");
  }
};

module.exports = { emailVerifyWithNodemaler };
