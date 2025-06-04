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
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Contact Form Submission: ${subject}`,
        text: message,
        html: htmlMessage,
      }
    );

    console.log("Email sent to recipient:", responseToRecipient);

    // Prepare confirmation email for user
    const confirmationText = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 580px; margin: 0 auto; background-color: #fdfdfd; border: 1px solid #d4d4d8; border-radius: 2px;">
      
      <!-- Header -->
    <div style="background-color: #18181b; padding: 16px 32px; border-bottom: 2px solid #3f3f46;">
      <h1 style="color: #fafafa; margin: 0; font-size: 18px; font-weight: 400; letter-spacing: 0.3px;">
        Message Confirmation
      </h1>
    </div>
  
      <!-- Content -->
      <div style="padding: 32px;">
        
        <div style="margin-bottom: 28px;">
          <p style="font-size: 16px; color: #27272a; margin: 0; line-height: 1.5;">
            Dear ${userName},
          </p>
        </div>
  
        <div style="margin-bottom: 28px;">
          <p style="font-size: 15px; color: #3f3f46; line-height: 1.6; margin: 0;">
            I have received your message sent through my website contact form. Thank you for reaching out!
          </p>
        </div>
  
        <!-- Message Content -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: #18181b; font-size: 16px; font-weight: 500; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: Arial, sans-serif;">
            Message Details
          </h3>
          <div style="background-color: #f4f4f5; padding: 20px; border: 1px solid #e4e4e7; margin-top: 8px;">
            <div style="font-size: 14px; color: #52525b; line-height: 1.5;">
              ${htmlMessage}
            </div>
          </div>
        </div>
  
        <!-- Response Information -->
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 24px; margin-bottom: 28px;">
          <h4 style="color: #374151; font-size: 15px; font-weight: 500; margin: 0 0 12px 0; font-family: Arial, sans-serif;">
            Response Timeline
          </h4>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0;">
            You can expect a personal response from me within 2-3 business days. I appreciate your patience as I work through my messages.
          </p>
        </div>
  
        <!-- Contact Information -->
        <div style="margin-bottom: 32px;">
          <p style="font-size: 15px; color: #3f3f46; line-height: 1.6; margin: 0;">
            If you have any urgent questions or need immediate assistance, please feel free to reach out to me directly at <a href="mailto:${process.env.RECIPIENT_EMAIL}" style="color: #2563eb; text-decoration: none;">${process.env.RECIPIENT_EMAIL}</a>.
          </p>
        </div>
  
        <!-- Signature -->
        <div style="border-top: 1px solid #e4e4e7; padding-top: 24px;">
          <p style="font-size: 15px; color: #3f3f46; margin: 0 0 8px 0;">
            Regards,
          </p>
          <p style="font-size: 16px; color: #18181b; font-weight: 500; margin: 0;">
            Vinay Prabhakar
          </p>
        </div>
  
      </div>
  
      <!-- Footer -->
      <div style="background-color: #f4f4f5; padding: 20px 32px; border-top: 1px solid #e4e4e7;">
        <p style="font-size: 12px; color: #71717a; margin: 0; line-height: 1.4;">
          This message was automatically generated in response to your contact form submission. 
          Please do not reply to this email address as it is not monitored for responses.
        </p>
      </div>
  
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
