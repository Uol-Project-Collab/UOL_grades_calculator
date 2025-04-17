const nodemailer = require("nodemailer");

/**
 * Sends an email with a PDF attachment.
 *
 * This function uses Nodemailer to send an email via Gmail.
 * The email body is generated from a custom HTML template that includes the recipient’s name.
 * A PDF attachment is created from a provided data URI.
 *
 * @async
 * @function sendEmailWithAttachment
 * @param {object} req - Express request object.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.recipientEmail - The recipient's email address.
 * @param {string} req.body.pdfDataUri - The PDF file as a data URI string.
 * @param {string} req.body.recipientName - The recipient's name to be inserted into the template.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response indicating success or failure.
 */
const sendEmailWithAttachment = async (req, res) => {
  try {
    const { recipientEmail, pdfDataUri, recipientName } = req.body;
    if (!recipientEmail || !pdfDataUri) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (recipientName && typeof recipientName !== "string") {
      return res.status(400).json({ error: "Invalid recipient name" });
    }

    // Create a transporter using Gmail (credentials should be stored securely)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,       // Stored securely in .env file
        pass: process.env.GOOGLE_APP_PASS   // Stored securely in .env file
      }
    });

    // HTML email template with the name substituted in (default to "there" if none provided)
    const htmlTemplate = `
      <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f4f4f9; border-radius: 8px; font-family: Helvetica, Arial, sans-serif; color: #333; text-align: center;">
        <h2 style="text-align: center; color: #004080;">📄 Your Requested File is Ready!</h2>
        <p style="font-size: 16px;">Hi <strong>${recipientName || "there"}</strong>,</p>
        <p style="font-size: 15px;">
          Thanks for reaching out! As requested, we've attached your PDF file. We hope it proves useful for maintaining your records and enhancing your understanding of your grades.
        </p>
        <p style="font-size: 14px; font-style: italic;">
          If you run into any issues or have any questions, our support team is just a message away. We're here to help!
        </p>
        <div style="margin: 20px 0; text-align: center;">
          <a href="mailto:uolprojectcollab@gmail.com" style="background-color: #004080; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Contact Support</a>
        </div>
        <p style="font-size: 15px;">
          Warmest regards, <br>
          <strong>UOL Project Collab Team</strong>
        </p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          This message was sent by the UOL Project Collab Team.
        </p>
      </div>
    `;

    // Convert data URI to buffer by stripping the header and converting the base64 data.
    const base64Data = pdfDataUri.split(";base64,").pop();
    const pdfBuffer = Buffer.from(base64Data, "base64");

    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: "Your Requested PDF File",
      html: htmlTemplate,
      attachments: [
        {
          filename: "modules.pdf",
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ success: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in sendEmailWithAttachment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sendEmailWithAttachment };