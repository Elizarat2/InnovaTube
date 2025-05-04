const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

module.exports = async ({ email, subject, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text: message
  };

  await transporter.sendMail(mailOptions);
};