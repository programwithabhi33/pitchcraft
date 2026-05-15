import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"PitchCraft AI" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOTPTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #09090B; color: #F4F4F5; margin: 0; padding: 0; }
        .container { max-width: 480px; margin: 40px auto; background-color: #18181B; border: 1px solid #27272A; border-radius: 24px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #7C3AED, #6D28D9); padding: 32px; text-align: center; }
        .logo-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 12px; display: inline-block; line-height: 40px; color: white; font-size: 20px; font-weight: bold; }
        .content { padding: 40px 32px; text-align: center; }
        .otp-code { font-size: 48px; font-weight: 800; letter-spacing: 8px; color: #A78BFA; margin: 24px 0; font-family: monospace; }
        .footer { padding: 24px; text-align: center; border-top: 1px solid #27272A; font-size: 12px; color: #71717A; }
        h1 { margin: 0; font-size: 24px; color: white; }
        p { line-height: 1.6; color: #A1A1AA; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-icon">P</div>
          <h1 style="margin-top: 16px;">Verify Your Email</h1>
        </div>
        <div class="content">
          <p>Welcome to PitchCraft AI. Use the code below to verify your account and start winning clients.</p>
          <div class="otp-code">${otp}</div>
          <p>This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} PitchCraft AI. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getResetPasswordTemplate = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #09090B; color: #F4F4F5; margin: 0; padding: 0; }
        .container { max-width: 480px; margin: 40px auto; background-color: #18181B; border: 1px solid #27272A; border-radius: 24px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #7C3AED, #6D28D9); padding: 32px; text-align: center; }
        .logo-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 12px; display: inline-block; line-height: 40px; color: white; font-size: 20px; font-weight: bold; }
        .content { padding: 40px 32px; text-align: center; }
        .btn { display: inline-block; padding: 14px 32px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; margin: 24px 0; }
        .footer { padding: 24px; text-align: center; border-top: 1px solid #27272A; font-size: 12px; color: #71717A; }
        h1 { margin: 0; font-size: 24px; color: white; }
        p { line-height: 1.6; color: #A1A1AA; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-icon">P</div>
          <h1 style="margin-top: 16px;">Reset Password</h1>
        </div>
        <div class="content">
          <p>You requested to reset your PitchCraft AI password. Click the button below to set a new one:</p>
          <a href="${resetUrl}" class="btn">Reset My Password</a>
          <p>This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          <p style="font-size: 11px; margin-top: 20px; word-break: break-all;">If the button doesn't work, copy and paste this link: <br/> ${resetUrl}</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} PitchCraft AI. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};
