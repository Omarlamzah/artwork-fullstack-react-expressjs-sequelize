const nodemailer = require("nodemailer");

 const transportergmail = nodemailer.createTransport({
  service: 'Gmail',  
  auth: {
    user: 'omarlamzah64@gmail.com',
    pass: process.env.gmail_password
  }
}
);

module.exports = transportergmail
