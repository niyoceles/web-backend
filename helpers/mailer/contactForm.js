import 'dotenv/config';
import nodemailer from 'nodemailer';
const receiverEmail = process.env.EMAIL_RECEIVER;

export const contactForm = async (names, email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PWD, // https://support.google.com/accounts/answer/185833?visit_id=638360865610150973-3194767862&p=InvalidSecondFactor&rd=1
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.SENDER_EMAIL,
    subject:`#Contact us ${subject}`,
    html: `<div style="background-color: white; border-radius: 10px;">
    <p style="font-size: 18px; padding: 30px; ">
        ${message}
        <br><br>
        Best regards,
        <br>
        ${names}
        <br>
        <a
            href='#'
            style="color:#18a0fb; text-decoration:none"
        >
       ${email}
        </a>
    </p>
</div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        error,
      });
    }
    return res.status(HTTP_OK).json({
      message: 'Email sent successful',
    });
  });
};
