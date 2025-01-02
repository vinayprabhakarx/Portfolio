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

// Middleware for validation
const validateEmailData = (req, res, next) => {
  const data = req.query.userName ? req.query : req.body;
  const { userName, email, subject, message } = data;

  if (!userName || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  req.emailData = data; // Attach validated data to the request object
  next();
};

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Route to handle sending emails
app.post("/api/email", validateEmailData, async (req, res) => {
  try {
    const { userName, email, subject, message } = req.emailData;

    // Convert message text into HTML paragraphs
    const htmlMessage = message
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${userName} <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject,
      text: message,
      html: htmlMessage,
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
