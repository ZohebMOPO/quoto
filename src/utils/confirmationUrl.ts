import nodemailer from "nodemailer";

export const sendConfirmationMail = (
  name: string,
  email: string,
  confirmationCode: string,
) => {
  const senderMail = process.env.SENDER_MAIL;
  const senderPassword = process.env.PASS;
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: senderMail,
      pass: senderPassword,
    },
  });

  try {
    transport.sendMail({
      from: senderMail,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:4000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    });
  } catch (err) {
    console.log(err);
  }
};
