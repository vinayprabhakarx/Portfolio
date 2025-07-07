import express from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
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

// --- Mailgun Setup ---
let mg;
try {
  const mailgun = new Mailgun(formData);
  mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });
  console.log("✅ Mailgun initialized");
} catch (error) {
  console.error("❌ Mailgun initialization failed:", error.message);
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
  const websiteUrl =
    process.env.SENDER_WEBSITE || "https://vinayprabhakar.tech";
  const displayUrl = websiteUrl.replace(/^https?:\/\//, "");

  return `
<div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
  <!-- Header -->
  <div style="background-color: #111827; padding: 16px 24px; border-bottom: 1px solid #334155;">
    <h3 style="color: #f9fafb; margin: 0; font-size: 20px; font-weight: 600;">📩 Message Confirmation</h3>
  </div>
  <!-- Body -->
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #27272a;">Dear ${sanitizeForEmail(
        userName
      )},</p>
      <p style="font-size: 15px; color: #3f3f46;">
        Thank you for reaching out! I’ve received your message and will respond soon.
      </p>
      <h3 style="color: #18181b; margin-top: 30px;">Your Message</h3>
      <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #6366f1;">
        ${htmlMessage}
      </div>
      <div style="background: #f0f9ff; padding: 20px; margin-top: 24px;">
        <h4 style="color: #0369a1;">📅 What Happens Next?</h4>
        <p style="color: #0c4a6e;">
          I typically reply within 2–3 business days. You can also email me directly at 
          <a href="mailto:${recipientEmail}" style="color: #2563eb;">${recipientEmail}</a>.
        </p>
      </div>
      <p style="margin-top: 24px;">Best regards,<br><strong>Vinay Prabhakar</strong></p>
    </div>
   <div style="background: #f8f9fa; padding: 16px 32px; border-top: 1px solid #e4e4e7; text-align: center;">
      <p style="font-size: 12px; color: #6b7280;">
        This is an automated message — please do not direct reply.<br>
        Sent from <a href="${websiteUrl}" style="color: #2563eb;">${displayUrl}</a><br/>
        ${new Date().toLocaleDateString()}
      </p>
    </div>
  </div>`;
};

// --- Submission Template (for site owner) ---
const createSubmissionEmail = ({ userName, email, subject, message }) => {
  const htmlMessage = createHtmlMessage(message);
  const websiteUrl =
    process.env.SENDER_WEBSITE || "https://vinayprabhakar.tech";
  const displayUrl = websiteUrl.replace(/^https?:\/\//, "");

  return `
    <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #111827; padding: 16px 24px; border-bottom: 1px solid #334155;">
       <h3 style="color: #f9fafb; margin: 0; font-size: 20px; font-weight: 600;">📩 Message Confirmation</h3>
    </div>
  <!-- Body -->
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #27272a;">
        <strong>Name:</strong> ${sanitizeForEmail(userName)}<br/>
        <strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a><br/>
        <strong>Subject:</strong> ${sanitizeForEmail(subject)}<br/>
        <strong>Received:</strong> ${new Date().toLocaleString()}
      </p>

      <h3 style="margin-top: 30px; color: #18181b;">📨 Message</h3>
      <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #6366f1;">
        ${htmlMessage}
      </div>

      <div style="background: #f0f9ff; padding: 20px; margin-top: 24px;">
        <h4 style="color: #0369a1;">🔍 Tip</h4>
        <p style="color: #0c4a6e;">
          This message was submitted via your website contact form. You can reply directly to this user by clicking their email.
        </p>
      </div>

      <p style="margin-top: 24px;">Kind regards,<br><strong>Your Website Bot</strong></p>
    </div>

    <div style="background: #f8f9fa; padding: 16px 32px; border-top: 1px solid #e4e4e7; text-align: center;">
      <p style="font-size: 12px; color: #6b7280;">
        Submission from <a href="${websiteUrl}" style="color: #2563eb;">${displayUrl}</a><br/>
        ${new Date().toLocaleDateString()}
      </p>
    </div>
  </div>`;
};

// --- Retry Email ---
const sendEmailWithRetry = async (emailData, maxRetries = 3) => {
  let error;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await mg.messages.create(
        process.env.MAILGUN_DOMAIN,
        emailData
      );
      console.log(`✅ Email sent (Attempt ${attempt}): ${result.id}`);
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
  "/api/email",
  emailValidationRules,
  handleValidationErrors,
  async (req, res) => {
    const startTime = Date.now();
    const { userName, email, subject, message } = req.body;

    console.log(`📩 Incoming message from ${email} - ${subject}`);

    try {
      const confirmationHtml = createConfirmationEmail(userName, message);
      const submissionHtml = createSubmissionEmail({
        userName,
        email,
        subject,
        message,
      });

      const recipientEmailData = {
        from: `Website Bot <noreply@${process.env.MAILGUN_DOMAIN}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `📬 New Contact Submission: ${subject}`,
        text: `From: ${userName} <${email}>\nSubject: ${subject}\n\n${message}`,
        html: submissionHtml,
        "h:Reply-To": email,
      };

      const confirmationEmailData = {
        from: `Vinay Prabhakar <noreply@${process.env.MAILGUN_DOMAIN}>`,
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

// --- Start Server ---
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
