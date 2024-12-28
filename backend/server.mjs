import express from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

app.post("/api/send-email", async (req, res) => {
  try {
    // Get data from either query params or request body
    const data = req.query.userName ? req.query : req.body;
    const { userName, email, subject, message } = data;

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${userName} <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    console.log("Email response:", response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Error in sending email",
      error: error.message,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
