import 'dotenv/config';

const appUrl = process.env.APP_URL_FRONTEND;
const senderEmail = process.env.EMAIL_SENDER;
const sender = process.env.EMAIL_SENDER_MAILING;
const Logo = process.env.COT_LOGO_URL;
const visitOurWebsite = `or <br>
Visit our website to <br><a href='https://godiscoverafrica.rw/'
        style="color:#d23d77; text-decoration:underline" 
        https://godiscoverafrica.rw/
        </a>`;

export const subscribed = async (email, id) => {
	const unsubscribeLink = `${appUrl}/maillist/unsubcribe/${id}`;
	const subscribeMessage = {
		to: email,
		from: senderEmail,
		Subject: 'Subscribed Confirmation #GODISCOVER',
		text: ` GODISCOVER AFRICA `,
		html: `<div style="background-color: #f9a758; padding: 30px; width: 80%; margin-left: 8%;">
    <img src=${Logo} width="120px" height="75px" alt="logo"/>
    <div style="background-color: white; border-radius: 10px;">
                    <p style="font-size: 14px; padding: 30px;"> 
                        Dear <b>${email}</b> ,
                        <br><br>
                        Thanks, your subscription has been confirmed. 
                        You've been added to our list and will hear from us soon.
                        <br> <br>
                        
                        Need help? Ask our Call center <b>8181</b>  or contact info@godiscoverafrica.rw
                        <br><br>
                        Best regards, 
                        <br>
                        <a
                            href='https://godiscoverafrica.rw/'
                            style="color:#18a0fb; text-decoration:none"
                            target='_blank'
                        > 
                        GODISCOVER AFRICA 
                        </a>
                    </p>
                    <p>
                <center>   If you don't want to hear from us
                    <a
                    href='${unsubscribeLink}'
                    style="color:#f44336; font-size: 14px; text-decoration:none"
                    target='_blank'
                > 
                Unsubscribe
                </a>
                </center> 
                <br> <br>
                    </p>
                </div>
            </div>
        `,
	};
	// sGmail.setApiKey(process.env.SENDGRID_API_KEY);
	// await sGmail.send(subscribeMessage);
};

export const unsubscribed = async email => {
	// const subscribeLink = `${appUrl}/maillist/subcribe/${email}`;
	const unsubscribeMessage = {
		to: email,
		from: senderEmail,
		Subject: 'Successful unsubcribed #GODISCOVER Confirmation',
		text: ` GODISCOVER AFRICA `,
		html: `<div style="background-color: #f9a758; padding: 30px; width: 80%; margin-left: 8%;">
            <img src=${Logo} width="100px" height="75px" alt="logo"/>
                <div style="background-color: white; border-radius: 10px;">
                    <p style="font-size: 14px; padding: 30px;"> 
                        Dear <b>${email}</b> ,<br>
                        <br> 
                        You've been removed to our mail list, Sorry to see you go.
                        <br>             
                        Need to stay in touch again? back to subscribe on our website
                        <a
                        href='https://godiscoverafrica.rw/'
                        style="color:#d23d77; text-decoration:underline"
                        target='_blank'
                    > 
                    https://godiscoverafrica.rw/
                    </a>
                        <br><br>
                        Best regards, 
                        <br>
                        GODISCOVER AFRICA 
                        <br>
                        <a
                            href='https://godiscoverafrica.rw/'
                            style="color:#18a0fb; text-decoration:none"
                            target='_blank'
                        > 
                        GODISCOVER AFRICA 
                        </a>
                    </p>
                </div>
            </div>
        `,
	};
	sGmail.setApiKey(process.env.SENDGRID_API_KEY);
	await sGmail.send(unsubscribeMessage);
};

export const sendToSubscribers = async (email, message, title, link, id) => {
	const unsubscribeLink = `${appUrl}/unsubscribe/${id}`;
	const urllink = `${appUrl}/${link}`;
	const subscribeMessage = {
		to: email,
		from: sender,
		Subject: `${title} [#GODISCOVER AFRICA ]`,
		text: `GODISCOVER AFRICA `,
		html: `<div style="background-color: #f9a758; padding: 30px; width: 80%; margin-left: 8%;">
           <img src=${Logo} width="120px" height="75px" alt="logo"/>
               <div style="background-color: white; border-radius: 10px; margin: 3%;">
                    <p style="font-size: 12px important; padding: 30px; margin: 3%;"> 
                        Dear <b>${email}</b> ,
                        <br><br>
                         ${message}
                         <br>
                  to view more Click <a
                         href='${urllink}'
                         style="color:#d23d77; text-decoration:underline"
                         target='_blank'
                     > 
                     HERE
                     </a>
                     <br>
                     ${visitOurWebsite}
                        <br> <br>
                        Best regards, 
                        <br>
                        <a
                            href='https://godiscoverafrica.rw/'
                            style="color:#18a0fb; text-decoration:none"
                            target='_blank'
                        > 
                        GODISCOVER AFRICA 
                        </a>
                    </p>
                    <p>
                <center>Don't want to receive these emails?
                    <a
                    href='${unsubscribeLink}'
                    style="color:#f44336; font-size: 14px; text-decoration:none"
                    target='_blank'
                > 
                Unsubscribe
                </a>
                </center>  
                <br>
                    </p>
                </div>
            </div>
        `,
	};
	sGmail.setApiKey(process.env.SENDGRID_API_KEY);
	await sGmail.send(subscribeMessage);
};

export const sendPubtoScribers = async (email, documentLink, title, id) => {
	const unsubscribeLink = `${appUrl}/unsubscribe/${id}`;
	const subscribeMessage = {
		to: email,
		from: sender,
		Subject: `${title} [#GODISCOVER AFRICA `,
		text: `GODISCOVER AFRICA`,
		html: `<div style="background-color: #f9a758; padding: 30px; width: 80%; margin-left: 8%;">
           <img src=${Logo} width="120px" height="75px" alt="logo"/>
               <div style="background-color: white; border-radius: 10px; margin: 3%;">
                    <p style="font-size: 14px important; padding: 30px; margin: 3%;"> 
                        Dear <b>${email}</b> ,
                        <br><br>
                        GODISCOVER AFRICA  published ${title}
                         <br>
                       To view more about this publication, <a
                         href='${documentLink}'
                         style="text-decoration:underline"
                         target='_blank'
                     > 
                     Click here
                     </a>
                     <br>
                     ${visitOurWebsite}
                        <br> <br>
                        Best regards, 
                        <br>
                        <a
                            href='https://godiscoverafrica.rw/'
                            style="color:#18a0fb; text-decoration:none"
                            target='_blank'
                        > 
                         GODISCOVER AFRICA 
                        </a>
                    </p>
                    <p>
                <center>Don't want to receive these emails?
                    <a
                    href='${unsubscribeLink}'
                    style="color:#f44336; font-size: 14px; text-decoration:none"
                    target='_blank'
                > 
                Unsubscribe
                </a>
                </center>  
                <br>
                    </p>
                </div>
            </div>
        `,
	};
	sGmail.setApiKey(process.env.SENDGRID_API_KEY);
	await sGmail.send(subscribeMessage);
};
