import 'dotenv/config';
import nodemailer from 'nodemailer';
const receiverEmail = process.env.EMAIL_RECEIVER;

export const createOrderEmail = async (names, email, bookId, appUrl) => {
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
    subject:`Create order successful`,
    html: `
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

      <h3 style="color: #333;">Hello  ${names}</h3>

        <h1 style="color: #333;">Order Successfully Created</h1>

        <h3 style="color: #333;">Order No: ${bookId}</h3>
        
        <p style="color: #555; line-height: 1.6;">Your order has been successfully created. Thank you for your purchase!</p>
        
        <p style="color: #555; line-height: 1.6;">Please proceed to make the payment to complete the transaction.</p>
        
        <p style="color: #555; line-height: 1.6;">
            To make the payment, click on the following link:
            <a href="${appUrl}/myorder/${bookId}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold;">Make Payment</a>
        </p>
        <p>
        <br><br>
        Need help? Ask our Call us <b>+250 791 349 744</b>  or contact info@godiscoverafrica.rw
        <br><br><br>
        Best regards, 
        <br>
        Website:
        <a
            href='${appUrl}'
            style="color:#18a0fb; text-decoration:none"
            target='_blank'
        > 
        ${appUrl}
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
