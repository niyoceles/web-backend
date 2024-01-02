import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// export const sendEmail = async () => {
// 	var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'niyoceles3@gmail.com',
//           pass: process.env.SENDER_PWD //https://support.google.com/accounts/answer/185833?visit_id=638360865610150973-3194767862&p=InvalidSecondFactor&rd=1
//         }
//       });
      
//       var mailOptions = {
//         from: 'niyoceles3@gmail.com',
//         to: 'niyoceles3@gmail.com',
//         subject: 'Sending Email using Node.js',
//         html:  `<div style="background-color: white; border-radius: 10px;">
//         <p style="font-size: 18px; padding: 30px; "> 
//             ${'HELLO'}  
//             <br><br>
//             Best regards, 
//             <br>
//             ${'CELESTIN'}
//             <br>
//             <a
//                 href='#'
//                 style="color:#18a0fb; text-decoration:none"
//             > 
//            ${'NISISI'}
//             </a>
//         </p>
//     </div>`
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// };

