var api_key = '9154dadcfc9bfa5106a0436e28780da0-78f6ccbe-e9b8ead9';
var domain = 'sandbox62cd3c0e2ccb4a79b5350b1218469502.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'nahid515023@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});