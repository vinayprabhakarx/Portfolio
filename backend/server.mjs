import express from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Enable CORS and JSON parsing
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

  req.emailData = data;
  next();
};

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Email route
app.post("/api/email", validateEmailData, async (req, res) => {
  try {
    const { userName, email, subject, message } = req.emailData;

    const htmlMessage = message
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");

    // Send email to recipient (your Gmail)
    const responseToRecipient = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      {
        from: `Vinay Prabhakar <no-reply@${process.env.MAILGUN_DOMAIN}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        text: message,
        html: htmlMessage,
      }
    );

    console.log("Email sent to recipient:", responseToRecipient);

    // Prepare confirmation email for user
    const confirmationText = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h3 style="color: #f9f9f9;">Hello ${userName},</h3>
  
      <p style="font-size: 16px; color: #333;">
        Thank you for reaching out to me! 🙌<br/>
        I've received your message and will get back to you as soon as possible.
      </p>
  
      <h3 style="color: #f9f9f9;">Your Message:</h3>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
        ${htmlMessage}
      </div>
  
      <p style="font-size: 16px; color: #333;">
        If you need to contact me again, feel free to reply through the contact form on my website.
      </p>
  
      <p style="font-size: 16px; color: #333;">Kind regards,</p>
      <p style="font-weight: bold; font-size: 16px; color: #f9f9f9;">Vinay Prabhakar</p>
  
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #777;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `;

    // Send confirmation email to user
    const confirmationResponse = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      {
        from: `Vinay Prabhakar <noreply@${process.env.MAILGUN_DOMAIN}>`,
        to: email,
        subject: "Thanks for contacting me!",
        html: confirmationText,
      }
    );

    console.log("Confirmation email sent to sender:", confirmationResponse);

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Error in sending email",
      error: error.message,
    });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
