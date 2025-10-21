const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const {getMonthlyReport, getCategoryReport} = require('../controllers/reportsController');
const router = express.Router();

//MIDDLEWARE TO VERIFY TOKEN
router.use(verifyToken);

//ENDPOINTS FOR REPORT ROUTES
router.get('/monthly', getMonthlyReport);
router.get('/category', getCategoryReport);

module.exports = router;