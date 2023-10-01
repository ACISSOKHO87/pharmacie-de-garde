const nodeMailer = require("nodemailer")

type objectMail = {
    mailTo: string
    subject: string
    title: string
    text: string
}

export default function mailing(obj: objectMail): void {

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
        from: '"Pharma\'Gard Tamba" <pharma.gardtc@gmail.com>', // qui envoi
        to: obj.mailTo, // le destinataire
        subject: obj.subject,
        text: "", // text de corps,
        html: `<h1>${obj.title}</h1><p>${obj.text}</p>`
    }

    // envoi du mail avec une callback pour voir si ça a réussi
    transporter.sendMail(mailOptions, (error: any, info: any) =>{
        if (error) {
            console.log("Impossible d'envoyer le message");
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);   
    })

}