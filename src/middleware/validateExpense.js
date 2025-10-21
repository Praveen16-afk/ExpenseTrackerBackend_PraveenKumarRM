const {body} = require('express-validator');
const {validationResult} = require('express-validator');

// VALIDATING EXPENSE BY CHECKING EACH FIELD
const validateExpense = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("amount").isNumeric({gt : 0}).withMessage("Amount must be positive"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("date").isISO8601().toDate().withMessage("Date is required and it must be valid"),

    (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array().map(e => ({
                field: e.param, message: e.msg
                })),
            })
        }
        //GOING TO NEXT
        next(); 
    }
];

module.exports = validateExpense;