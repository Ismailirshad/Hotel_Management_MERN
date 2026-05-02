const WelcomeTemplate = (name) => {

  return `
  <div style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:30px;text-align:center;">
        
        <!-- Logo -->
        <img 
          src="https://res.cloudinary.com/duzakztuk/image/upload/v1777736511/Elite_logo_khuyfr.png" 
          alt="Elite Logo" 
          style="width:70px;height:70px;border-radius:50%;object-fit:cover;margin-bottom:15px;"
        />

        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:600;">
          Welcome to Elite
        </h1>

        <p style="color:#cbd5f5;margin-top:8px;font-size:14px;">
          Luxury Hotel Management Platform
        </p>
      </div>

      <!-- Body -->
      <div style="padding:40px;">
        <h2 style="color:#111827;font-size:22px;margin-bottom:15px;">
          Hi ${name},
        </h2>

        <p style="color:#4b5563;font-size:16px;line-height:1.7;margin-bottom:25px;">
          We're excited to have you onboard! Your journey into seamless and premium hotel management starts now.
        </p>

        <!-- Features -->
        <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:25px;">
          <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">
            🚀 Manage bookings effortlessly<br/>
            🏨 Track rooms in real-time<br/>
            📊 Get powerful analytics
          </p>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin:35px 0;">
          <a href="${process.env.CLIENT_URL}" 
             style="background:linear-gradient(135deg,#2563eb,#1d4ed8);
                    color:#ffffff;
                    padding:14px 32px;
                    text-decoration:none;
                    border-radius:999px;
                    font-weight:600;
                    display:inline-block;
                    box-shadow:0 4px 14px rgba(37,99,235,0.4);">
            Go to Dashboard →
          </a>
        </div>

        <p style="color:#6b7280;font-size:14px;">
          If you have any questions, just reply to this email—we're always here to help.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#9ca3af;">
        <strong>Elite Hotel Management</strong><br/>
        © ${new Date().getFullYear()} All rights reserved
      </div>

    </div>
  </div>
  `;
};

export default WelcomeTemplate;
