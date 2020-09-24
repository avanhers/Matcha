const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matcha.4deux@gmail.com',
    pass: 'Matcha[42];'
  }
});

const mailOptions = {
  from: 'matcha.4deux@gmail.com',
  to: 'jules.jaegle@gmail.com',
  subject: 'coucou',
  text: `salut`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error: ', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})