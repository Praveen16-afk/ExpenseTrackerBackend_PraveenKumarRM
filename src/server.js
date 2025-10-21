const express = require('express');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const errorHandler = require('./middleware/errorHandler')
const {connectDB} = require('./utils/db');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use('/api', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportsRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

//STARTING SERVER AND CONNECTING TO DB
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})