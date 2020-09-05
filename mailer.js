 const nodemailer = require('nodemailer');

exports.sendMail = async (body) => {

  try {
        // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "mail.embassyofglory.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.USER, // generated ethereal user
              pass: process.env.PASSWORD, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Nodemailer Contact" <test@embassyofglory.com>', // sender address
            to: "jcinvent05@gmail.com", // list of receivers
            subject: "Node Contact Request", // Subject line
            text: "Hello world?", // plain text body
            html: body, // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (e) {
      console.log(e);
    }

}
