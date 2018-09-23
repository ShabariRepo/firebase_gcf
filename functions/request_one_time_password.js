const admin = require('firebase-admin');

module.exports = function(req, res){
    if(!req.body.phone){
        return res.status(422).send({ error:'you must provide phone number'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    admin.auth().getUser(phone)
        .then(userRecord => {
            
        })
        .catch((err) => {
            // if user is not found

            // do the below for production (to handle generic messages)
            res.status(422).send({ error: 'User Not Found' });
            // for debug return entire err object
        });
}