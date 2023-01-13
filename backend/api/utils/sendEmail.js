import nodemailer from 'nodemailer';
//use to send email
export const sendEmail = async (email, subject, text) => {

	try {
		
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'hariharangokul2022@gmail.com',
				pass: 'xuwiexkolzikpxke',
			}
		});

		let mailDetails = {
			from: 'hariharangokul2022@gmail.com',
			to: email,
			subject: subject,
			text: text,
		};
		
		let ct = transporter.sendMail(mailDetails, function (err, data) {
			if (err) {
				console.log('Error Occurs');
			} else {
				console.log('Email sent successfully', data);
			}
		});
		
	} catch (error) {
		
		return error;
	}
};

export default sendEmail;