const WelcomeTemplate = (name) => {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 50px 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background-color: #1e293b; padding: 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Elite</h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="color: #111827; font-size: 24px; margin-bottom: 20px;">Hi ${name},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            We're thrilled to have you! You've successfully joined the premier platform for luxury hotel management. Explore your dashboard to get started.
          </p>
          <div style="text-align: center; margin: 35px 0;">
            <a href=${process.env.CLIENT_URL} style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Dashboard</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">If you have any questions, feel free to reply to this email.</p>
        </div>
      </div>
    </div>
  `;
};

export default WelcomeTemplate;
