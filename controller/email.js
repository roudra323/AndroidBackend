
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  var api_key = process.env.MAILGUN_API_KEY;
  var domain = process.env.MAILGUN_DOMAIN;
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: subject,
    text: text,
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

module.exports = sendEmail;