require('dotenv').config();

const errorHandler = (error, req, res, next) => {
    console.error("Error: ", error.stack || error.message);

    if(error.array) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.array().map(err => ({field: err.param, message: err.msg}))
        })  
    }

    if(error.name === "ValidationError")
        return res.status(400).json({message: error.message});

    res.status(500).json({message: "Internal server error", errors: process.env.NODE_ENV === "development" ? 
        error.message : undefined
    });
}

module.exports = errorHandler;