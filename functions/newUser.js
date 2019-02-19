const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.default = functions.region('europe-west1').https.onCall((data, context) => {
    console.log(data)
    return admin.auth().createUser({
        email: data.email,
        emailVerified: true,
        password: data.password,
        displayName: data.email,
        disabled: false,
    })
        .then(user => {
            return {
                response: user
            }
        })
        .catch(error => {
            throw new functions.https.HttpsError('failed to create a user')
        })
})