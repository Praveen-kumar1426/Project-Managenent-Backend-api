import Mailgen from "mailgen";
import nodemailer from 'nodemailer'

const sendEmail = async(Option)=>{
  const mailGenerator =   new Mailgen({
        theme:"default", 
        product:{
            name: "Task Manger",
            link: "https://taskmangerlink.com"
        }
    })

   const emailTextual =  mailGenerator.generatePlaintext(Option.mailGenContent)
   const emailHtml=  mailGenerator.generate(Option.mailGenContent)



   const transporter = nodemailer.createTransport({
     host: process.env.MAILTRAP_SMTP_HOST,
     port: process.env.MAILTRAP_SMTP_PORT,
     auth: {
       user: process.env.MAILTRAP_SMTP_USER,
       pass: process.env.MAILTRAP_SMTP_PASSWORD,
     },
   });

   const mail = {
    from: "mail.taskmanger@example.com",
    to: Option.email,
    subject: Option.subject,
    text: emailTextual,
    html: emailHtml
   }
   try {
    await transporter.sendMail(mail)
   } catch (error) {
     console.error("Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file")
     console.error("Error:", error)
   }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
   return{
    body:{
        name:username,
        intro: "Welcome to our App! we'are excited to have you on board",
        action:{
            instructions: " To verify your email please click on the following button ",
            button: {
                color: "#22BC66",
                text: "Verfy your email",
                link:verificationUrl
            },
        },
        outro:"Need help, or have questions? Just reply to this email, we'd love to help"
    }
   }
}
const forgetPasswordMailgenContent = (username, passwordResetUrl) => {
   return{
    body:{
        name:username,
        intro: "We got a request to reset the password of your account",
        action:{
            instructions: " To reset your password click on the following buttonor link ",
            button: {
                color: "#22BC66",
                text: "Reset password",
                link: passwordResetUrl
            },
        },
        outro:"Need help, or have questions? Just reply to this email, we'd love to help"
    }
   }
}


export {
    emailVerificationMailgenContent,
    forgetPasswordMailgenContent, 
    sendEmail,
}