const admin = require('firebase-admin');

//VERIFYING TOKEN
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({message: "No token provided"});
    try {
        // DECODING THE TOKEN TO CHECK THE VALIDITY
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
};

module.exports = verifyToken;