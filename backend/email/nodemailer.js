import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: `"Hotel Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully!");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.log("Error sending email:", error.message);
    return { success: false, message: "Failed to send email" };
  }
};
export default sendEmail;
