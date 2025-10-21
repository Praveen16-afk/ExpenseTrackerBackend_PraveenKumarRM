const mongoose = require('mongoose');

//MONGODB SCHEMA FOR EXPENSE USING MONGOOSE
const expenseSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
},{
    timestamps: true,
});

//CREATING MODEL IN MONGODB USING MONGOOSE
const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;
