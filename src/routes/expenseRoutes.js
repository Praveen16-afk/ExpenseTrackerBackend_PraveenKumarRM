const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const {getExpense, getExpenseById, addExpense, updateExpense, deleteExpense} = require('../controllers/expenseController');
const validateExpense = require('../middleware/validateExpense');
const router = express.Router();

//MIDDLEWARE TO VERIFY TOKEN
router.use(verifyToken);

//ENDPOINTS FOR EXPENSE ROUTES
router.get('/', getExpense);
router.get('/:id', getExpenseById);
router.post('/', validateExpense, addExpense);
router.put('/:id', validateExpense, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;