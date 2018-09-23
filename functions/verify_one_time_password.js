// cloud function 3
const admin = require('firebase-admin');

module.exports = function(req, res){
    // if user does not provide a phone number or code (have to have both)
    if(!req.body.phone || !req.bod.code){
        return res.status(422).send({ error: 'Phone and code must be provided' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    // to make sure this is number cast as int
    const code = parseInt(code);

    // go look at users/.. in db and compare the code
    admin.auth().getUser(phone)
        .then(() => {
            // this is a FIREBASE specific query
            // the ref is the collection and on is the callback after returning the snapshot of data retrieved
            const dbRef = admin.database().ref('users/'+ phone);
            dbRef.on('value', snapshot => {
                const user = snapshot.val();

                if(user.code !== code || !user.codeValid){
                    return res.status(422).send({ error: 'Code Not Valid!' });
                }

                // if we get this far the code is valid and user is good
                // next mark the existing code as valid
                ref.update({ codeValid: false });
            });
        })
        .catch((err) => res.status(422).send({ error: err }));
        // pass along whole error for debugging
}