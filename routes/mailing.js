const router = require("express").Router();
const nodeMailer = require("nodemailer");

router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await sendMail(to, subject, text);
    res.send({ message: "Mail sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to send mail" });
  }
});
const transporter = nodeMailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.MAIL_APP_USERNAME,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

const sendMail = async (
  to = "danny@enpitech.dev",
  subject = "Test",
  text = "test-from-me"
) => {
  const mailOptions = {
    from: process.env.MAIL_APP_USERNAME,
    to,
    subject,
    text,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });
};

module.exports = router;
