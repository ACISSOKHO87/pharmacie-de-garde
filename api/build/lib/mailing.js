"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeMailer = require("nodemailer");
function mailing(obj) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    // creation du mail
    let mailOptions = {
        from: '"Pharma\'Gard Tamba" <pharma.gardtc@gmail.com>',
        to: obj.mailTo,
        subject: obj.subject,
        text: "",
        html: `<h1>${obj.title}</h1><p>${obj.text}</p>`
    };
    // envoi du mail avec une callback pour voir si ça a réussi
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Impossible d'envoyer le message");
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
exports.default = mailing;
