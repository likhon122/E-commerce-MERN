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

const emailVerifyWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = { emailVerifyWithNodemailer };
