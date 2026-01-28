import nodemailer from "nodemailer";

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "heavenon323@gmail.com",
      pass: "hhpkvifkpzqjqnwq",
    },
  });
  try {
    await transporter.sendMail({
      from: `"Hotel Management" <heavenon323@gmail.com>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
export default sendEmail;
