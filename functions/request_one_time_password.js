const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res){
    if(!req.body.phone){
        return res.status(422).send({ error:'you must provide phone number'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    admin.auth().getUser(phone)
        .then(userRecord => {
            // get a number anywhere from 1000 to 8999
            const code = Math.floor((Math.random() * 8999 + 1000));

            // twilio create is asynchronous but DOES NOT return a promise so cannot do then
            // instead its more traditional so we have to use a callback ... the () => after object
            twilio.messages.create({
                body: 'Your Code for flutr is: ' + code,
                to: phone,
                from: '6479300299'
            }, (err) => {
                // same production rules as below apply here (right now were debugging twilio)
                if(err){ return res.status(422).send(err); }

                // real big gotcha with FIREBASE
                // there are protected properties like created_at in the authentication tab of firebase
                // so instead we can use the FIREBASE Db since we can make up property values
                // so there is no phone in auth i think
                admin.database().ref('users/' + phone)
                    .update({ code: code, codeValid: true }, () => {
                        res.send({ success: true });
                    });
            });
        })
        .catch((err) => {
            // if user is not found

            // do the below for production (to handle generic messages)
            res.status(422).send({ error: 'User Not Found' });
            // for debug return entire err object
        });
}