const nodemailer = require("nodemailer");

const mailer = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "matcha.4deux@gmail.com",
      pass: "Matcha[42];",
    },
  }),

  mailOptions: {
    from: "matcha.4deux@gmail.com",
    to: undefined,
    subject: undefined,
    text: undefined,
  },

  subject: {
    confirmation: "Confirmation Mail",
    reset: "Reset Password",
  },

  model: {
    confirmation: function (hash) {
      return `To confirm your inscription please click here: http://localhost:3000/confirmation/${hash}`;
    },
    reset: function (hash) {
      return `To reset your password please click here: http://localhost:3000/reset/${hash}`;
    },
  },

  sendMail: async function (user, type, hash) {
    this.mailOptions.to = user.getEmail();
    this.mailOptions.subject = this.subject[type];
    this.mailOptions.text = this.model[type](hash);

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve("Email sent: " + info.response);
      });
    });
  },
};

module.exports = mailer;
