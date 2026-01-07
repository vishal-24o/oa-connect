import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(toEmail, otp) {
  await resend.emails.send({
    from: "OAConnect <onboarding@resend.dev>",
    to: toEmail,
    subject: "Your OAConnect Login OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>OAConnect Login</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 3px;">${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      </div>
    `,
  });
}
