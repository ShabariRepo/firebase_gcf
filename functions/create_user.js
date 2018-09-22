const admin = require('firebase-admin');
// can also be = () =>     instead of function()
// convention to say req, res instead of full
module.exports = function(req, res){
    // .send sends everything in the body back as JSON
    //res.send(req.body);

    // verify if user provided phone
    if(!req.body.phone){
        // res.status is the http response code
        // 422 err with info
        return res.status(422).send({ error: 'No Phone Number Entered' });
    }
    // format the phone number to remove dashes and parens
    // cast as string in case its number
    // regex for any character that is not a number
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    
    // create new user account using that phone number
    // uid is the property to identify user
    // async so have a promise and error catch
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));

    // respond to the user request saying the account was made

    
}