const OtpTemplate = (otp) => {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 50px 0;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="padding: 40px; text-align: center;">
          <h2 style="color: #111827; margin-bottom: 10px;">Verify Your Identity</h2>
          <p style="color: #6b7280; font-size: 15px;">Use the following one-time password to reset your account. This code is valid for 10 minutes.</p>
          
          <div style="margin: 30px 0;">
            <div style="background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">${otp}</span>
            </div>
          </div>
          
          <p style="color: #ef4444; font-size: 12px; font-weight: 500;">
            Important: Never share this code with anyone.
          </p>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Elite Management System &copy; 2026</p>
        </div>
      </div>
    </div>
  `;
};

export default OtpTemplate;