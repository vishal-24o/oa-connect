import nodemailer from "nodemailer";

export async function sendOtpEmail(toEmail, otp) {
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  await transporter.sendMail({
    from: `"OAConnect" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OAConnect Login OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      </div>
    `,
  });
}
