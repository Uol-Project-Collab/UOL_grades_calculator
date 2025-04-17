/**
 * EmailService handles sending emails with attachments using the backend Nodemailer service.
 */
class EmailService {
  /**
   * Sends an email with a PDF attachment by calling the backend endpoint.
   * @param {string} pdfDataUri - The PDF file as a data URI string.
   * @param {string} recipientEmail - The recipient's email address.
   * @param {string} recipientName - The recipient's name to include in the email template.
   * @returns {Promise<object>} Resolves with the backend response upon sending.
   */
  async sendPdfEmailDataUri(pdfDataUri, recipientEmail, recipientName) {
    try {
      const response = await axios.post("http://localhost:3000/api/send-email", {
        recipientEmail,
        pdfDataUri,
        recipientName
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message
      );
    }
  }
}

// Expose EmailService globally.
window.EmailService = EmailService;