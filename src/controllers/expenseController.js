const Expense = require("../models/expense");

// ADDING EXPENSE 
module.exports.addExpense = async (req, res) => {
    try {
        const {title, amount, category, date} = req.body;

        if(!title || !amount || !category || !date)
            return res.status(400).json({message: "All fields are required"})

        const expense = await Expense.create({userId: req.user.uid, title, amount, category, date});
        res.status(200).json({message: "Expense added successfully", id: expense._id});
    } catch (error) {
        console.error("Error in addExpense: ", error);
        res.status(500).json({message: "Internal server error"}) ;
    }
};

// GETTING EXPENSE FOR LOGGED IN USER - RETURNS A ARRAY
module.exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({userId: req.user.uid});
        if(!expenses.length)
            return res.status(400).json({message: "Expense not found"});
        res.status(200).json(expenses.map(exp => ({
                id: exp._id,
                title: exp.title,
                amount: exp.amount,
                category: exp.category,
                date: exp.date,
            }))
        )
    } catch (error) {
        console.error("Error in getExpense: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// GETTING EXPENSE BY ID
module.exports.getExpenseById = async (req, res) => {
    try {
        const expenses = await Expense.findById(req.params.id);
        
        if(!expenses)
            return res.status(400).json({message: "Expense not found"});

        res.status(200).json({
            id: expenses._id,
            title: expenses.title,
            amount: expenses.amount,
            category: expenses.category,
            date: expenses.date,
        });
        
    } catch (error) {
        console.error("Error in getExpenseById: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// UPDATING THE FIELDS FOR ALREADY CREATED EXPENSE IN THE DATABASE
module.exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body);

        if(!expense)
            return res.status(400).json({message: "Expense not found"});

        res.status(200).json({message: "Expense updated successfully"});
        
    } catch (error) {
        console.error("Error in updateExpense: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// DELETING EXPENSE BY ID
module.exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);

        if(!expense)
            return res.status(400).json({message: "Expense not found"});

        res.status(200).json({message: "Expense deleted successfully"});
        
    } catch (error) {
        console.log("Error in deleteExpense: ", error);
        res.status(500).json({message: "Internal error"})
    }
}