const { refreshToken } = require('firebase-admin/app');
const admin = require('../FireBase/fireBaseConfig');
require('dotenv').config();

// REGISTER USER IN FIREBASE WITH EMAIL AND PASSWORD
module.exports.registerUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) 
        return res.status(400).json({message: "Email and password are required"});

    try {
        let existingUser;
        try {
            existingUser = await admin.auth().getUserByEmail(email);
        } catch (error) {
            if(error.code != "auth/user-not-found")
                throw error;
        }

        if(existingUser)
            return res.status(400).json({message: "User already registered"})

        const userRecord = await admin.auth().createUser({email, password});

        res.status(200).json({message: "User registered successfully", uid: userRecord.uid})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
};

// LOGIN USERS WITH EMAIL AND PASSWORD CREDENTIALS
module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) 
        return res.status(400).json({message: "Email and password are required"});
    try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, returnSecureToken: true}),
        }
    );

    const data = await response.json();
    if(data.error)
        return res.status(401).json({message: data.error.message});
    
    res.status(200).json({token: data.idToken, message: "Login successful"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
};

// LOGOUT USER USING THE TOKEN = Bearer <FIREBASE-TOKEN> EMAIL AND PASSWORD ARE NOT REQUIRED
module.exports.logoutUser = async (req, res) => {
    try {
        return res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.error("Error in logout: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}