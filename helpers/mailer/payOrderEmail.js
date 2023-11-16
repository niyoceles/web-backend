import 'dotenv/config';
import nodemailer from 'nodemailer';
const receiverEmail = process.env.EMAIL_RECEIVER;
const appUrl = process.env.FRONT_END_URL;

export const payOrderEmail = async (email, bookId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PWD, // https://support.google.com/accounts/answer/185833?visit_id=638360865610150973-3194767862&p=InvalidSecondFactor&rd=1
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject:`Order paid successful`,
    html: `
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <h1 style="color: #333;">Order Successfully Paid</h1>

        <h3 style="color: #333;">Order No: ${bookId}</h3>
        
        <p style="color: #555; line-height: 1.6;">Your order has been successfully created. Thank you for your purchase!</p>
        
       
        
        <p style="color: #555; line-height: 1.6;">
            To view details, click on the following link:
            <a href="${appUrl}/myorder/${bookId}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold;">View details</a>
        </p>
        <p>
        <br><br>
        Need help? Ask our Call us <b>+250 791 349 744</b>  or contact info@godiscoverafrica.rw
        <br><br><br>
        Best regards, 
        <br>
        Website:
        <a
            href='https://godiscoverafrica.rw'
            style="color:#18a0fb; text-decoration:none"
            target='_blank'
        > 
         GODISCOVER AFRICA
        </a>
    </p>
    </div>
    
          `,
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
