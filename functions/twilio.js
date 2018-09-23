const twilio = require('twilio');

const accountSid = 'AC7561199ea9b2a76fa333cf4bc1b6f8d9';
const authToken = 'ff7770a60edac56d834a356dd76adbcb';

module.exports = new twilio.Twilio(accountSid, authToken);