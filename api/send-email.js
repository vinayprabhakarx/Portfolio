import express from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Email Provider Setup ---
let mg;
let smtpTransporter;
let emailProvider = "none";

// Try Mailgun API first
try {
  if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    const mailgun = new Mailgun(formData);
    mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });
    emailProvider = "mailgun";
    console.log("✅ Mailgun API initialized");
  }
} catch (error) {
  console.warn("⚠️ Mailgun API initialization failed:", error.message);
}

// Fallback to SMTP if Mailgun not available
if (emailProvider === "none" && process.env.SMTP_HOST) {
  try {
    smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    emailProvider = "smtp";
    console.log("✅ SMTP fallback initialized");
  } catch (error) {
    console.error("❌ SMTP initialization failed:", error.message);
  }
}

if (emailProvider === "none") {
  console.error(
    "❌ No email provider configured. Set MAILGUN_API_KEY or SMTP credentials."
  );
  process.exit(1);
}

// --- Input Validation Rules ---
const emailValidationRules = [
  body("userName")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s\-'.]+$/)
    .withMessage("Invalid characters in name"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 150 })
    .withMessage("Email too long")
    .normalizeEmail(),

  body("subject")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Subject must be 3–200 characters")
    .escape(),

  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be 10–2000 characters")
    .escape(),
];

// --- Error Handler for Validation ---
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

// --- Sanitization & Template Utilities ---
const sanitizeForEmail = (text) =>
  text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

const createHtmlMessage = (message) =>
  message
    .split("\n")
    .map(
      (line) =>
        `<p style="margin: 0 0 10px 0; line-height: 1.6;">${sanitizeForEmail(
          line.trim()
        )}</p>`
    )
    .join("");

// --- Confirmation Template ---
const createConfirmationEmail = (userName, originalMessage) => {
  const htmlMessage = createHtmlMessage(originalMessage);
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  const websiteUrl = process.env.SENDER_WEBSITE || "https://vinayprabhakar.dev";
  const displayUrl = websiteUrl.replace(/^https?:\/\//, "");

  // Extract first name and capitalize
  const firstName = userName.trim().split(" ")[0];
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e0e0e0;">
  <!-- Header -->
  <div style="background-color: #000000; padding: 16px 32px;">
    <h2 style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 400; letter-spacing: 1px;">MESSAGE CONFIRMATION</h2>
  </div>
  
  <!-- Body -->
  <div style="padding: 40px 32px;">
    <p style="font-size: 16px; color: #000000; margin: 0 0 24px 0;">Hi ${capitalizedFirstName},</p>
    
    <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 32px 0;">
      Thank you for reaching out. I have received your message and will respond within 2–3 business days.
    </p>
    
    <div style="border-top: 1px solid #e0e0e0; padding-top: 24px; margin-bottom: 24px;">
      <h3 style="color: #000000; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</h3>
      <div style="background: #f5f5f5; padding: 20px; border-left: 2px solid #000000;">
        ${htmlMessage}
      </div>
    </div>
    
    <p style="font-size: 14px; color: #666666; margin: 32px 0 0 0; line-height: 1.6;">
      For direct inquiries, contact me at <a href="mailto:${recipientEmail}" style="color: #000000; text-decoration: underline;">${recipientEmail}</a>
    </p>
    
    <p style="margin-top: 32px; color: #000000;">Best regards,<br><strong>Vinay Prabhakar</strong></p>
  </div>
  
  <!-- Footer -->
  <div style="background: #f9f9f9; padding: 20px 32px; border-top: 1px solid #e0e0e0;">
    <p style="font-size: 11px; color: #999999; margin: 0; line-height: 1.5;">
      This is an automated message. Please do not reply directly to this email.<br>
      ${displayUrl} • ${new Date().toLocaleDateString()}
    </p>
  </div>
</div>`;
};
// --- Submission Template (for site owner) ---
const createSubmissionEmail = ({ userName, email, subject, message }) => {
  const htmlMessage = createHtmlMessage(message);
  const websiteUrl = process.env.SENDER_WEBSITE || "https://vinayprabhakar.dev";
  const displayUrl = websiteUrl.replace(/^https?:\/\//, "");

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e0e0e0;">
  <!-- Header -->
  <div style="background-color: #000000; padding: 16px 32px;">
    <h2 style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 400; letter-spacing: 1px;">NEW CONTACT SUBMISSION</h2>
  </div>
  
  <!-- Body -->
  <div style="padding: 40px 32px;">
    <div style="margin-bottom: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 100px;">Name</td>
          <td style="padding: 8px 0; font-size: 14px; color: #000000; font-weight: 500;">${sanitizeForEmail(
            userName
          )}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #666666; border-top: 1px solid #f0f0f0;">Email</td>
          <td style="padding: 8px 0; font-size: 14px; border-top: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #666666; border-top: 1px solid #f0f0f0;">Subject</td>
          <td style="padding: 8px 0; font-size: 14px; color: #000000; font-weight: 500; border-top: 1px solid #f0f0f0;">${sanitizeForEmail(
            subject
          )}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #666666; border-top: 1px solid #f0f0f0;">Date</td>
          <td style="padding: 8px 0; font-size: 14px; color: #000000; border-top: 1px solid #f0f0f0;">${new Date().toLocaleString()}</td>
        </tr>
      </table>
    </div>
    
    <div style="border-top: 1px solid #e0e0e0; padding-top: 24px;">
      <h3 style="color: #000000; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
      <div style="background: #f5f5f5; padding: 20px; border-left: 2px solid #000000;">
        ${htmlMessage}
      </div>
    </div>
    
    <p style="font-size: 13px; color: #999999; margin: 32px 0 0 0; line-height: 1.6;">
      Reply directly to this email to respond to ${sanitizeForEmail(userName)}.
    </p>
  </div>
  
  <!-- Footer -->
  <div style="background: #f9f9f9; padding: 20px 32px; border-top: 1px solid #e0e0e0;">
    <p style="font-size: 11px; color: #999999; margin: 0; line-height: 1.5;">
      Contact form submission from ${displayUrl}<br>
      ${new Date().toLocaleDateString()}
    </p>
  </div>
</div>`;
};

// --- Send Email (Mailgun API or SMTP) ---
const sendEmailWithRetry = async (emailData, maxRetries = 3) => {
  let error;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      let result;

      if (emailProvider === "mailgun") {
        // Send via Mailgun API
        result = await mg.messages.create(
          process.env.MAILGUN_DOMAIN,
          emailData
        );
        console.log(
          `✅ Email sent via Mailgun (Attempt ${attempt}): ${result.id}`
        );
      } else if (emailProvider === "smtp") {
        // Send via SMTP
        const smtpOptions = {
          from: emailData.from,
          to: emailData.to,
          subject: emailData.subject,
          text: emailData.text,
          html: emailData.html,
          replyTo: emailData["h:Reply-To"] || undefined,
        };
        result = await smtpTransporter.sendMail(smtpOptions);
        console.log(
          `✅ Email sent via SMTP (Attempt ${attempt}): ${result.messageId}`
        );
      }

      return result;
    } catch (err) {
      error = err;
      console.warn(`❌ Attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * 2 ** (attempt - 1), 5000);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw error;
};

// --- Main API ---
app.post(
  "/api/send-email",
  emailValidationRules,
  handleValidationErrors,
  async (req, res) => {
    const startTime = Date.now();
    const { userName, email, subject, message } = req.body;

    console.log(`📩 Incoming message from ${email} - ${subject}`);

    try {
      // Extract and capitalize first name
      const firstName = userName.trim().split(" ")[0];
      const capitalizedFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

      const confirmationHtml = createConfirmationEmail(userName, message);
      const submissionHtml = createSubmissionEmail({
        userName,
        email,
        subject,
        message,
      });

      const fromEmail =
        process.env.SMTP_FROM ||
        process.env.MAILGUN_FROM ||
        `VinayPrabhakarX <noreply@${
          process.env.MAILGUN_DOMAIN || process.env.DOMAIN
        }>`;

      const recipientEmailData = {
        from: `Website Bot <noreply@${
          process.env.MAILGUN_DOMAIN || process.env.DOMAIN
        }>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Contact Submission from ${capitalizedFirstName}: ${subject}`,
        text: `From: ${userName} <${email}>\nSubject: ${subject}\n\n${message}`,
        html: submissionHtml,
        "h:Reply-To": email,
      };

      const confirmationEmailData = {
        from: fromEmail,
        to: email,
        subject: "Thanks for reaching out!",
        html: confirmationHtml,
      };

      const [recipientResult, confirmationResult] = await Promise.all([
        sendEmailWithRetry(recipientEmailData),
        sendEmailWithRetry(confirmationEmailData),
      ]);

      const duration = Date.now() - startTime;
      console.log(`✅ All emails sent in ${duration}ms`);

      return res.status(200).json({
        success: true,
        message: "Message sent and confirmation email dispatched.",
        data: {
          recipientEmailId: recipientResult.id,
          confirmationEmailId: confirmationResult.id,
          duration: `${duration}ms`,
        },
      });
    } catch (error) {
      console.error("❌ Email sending failed:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
        error: error.message,
      });
    }
  }
);

// --- Start Server (Local Development Only) ---
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
}

// Export for Vercel serverless
export default app;
