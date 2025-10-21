const admin = require('firebase-admin');
require('dotenv').config();

// INITIALIZING APP IN FIREBASE TO GET AND STORE THE USER CREDENTIALS (EMAIL AND PASSWORD)
if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    });   
}

module.exports = admin;