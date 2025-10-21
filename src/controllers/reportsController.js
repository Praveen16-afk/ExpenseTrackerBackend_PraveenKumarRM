const Expense = require('../models/expense');

//GETTING MONTHLY REPORT
module.exports.getMonthlyReport = async (req, res) => {
    try {
        const {month, year} = req.query;

        if(!month || !year) 
            return res.status(400).json({message: "Year and month are required"});

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        //TO AGGREGRATE BASED UPON CATEGORY FOR THAT PARTICULAR MONTH
        const expenses = await Expense.aggregate([
            {
                $match: {
                    userId: req.user.uid,
                    date: {$gte: startDate, $lt: endDate},
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: {$sum: "$amount"},
                },
            },
        ]);

        if(!expenses.length)
            return res.status(200).json({message: "No expenses found for this month", "total": 0, "categories": {}})

        // SUMMATION OF TOTAL AMOUNT
        const total = expenses.reduce((sum, cat) => sum + cat.totalAmount, 0);

        // MAPPING FOR CATEGORYWISE AMOUNT
        const categoryWise = {};
        expenses.forEach(e => {
            categoryWise[e._id] = e.totalAmount;
        });

        res.status(200).json({total, categories: categoryWise});

    } catch (error) {
        console.error("Error in getMonthlyReport: ", error);
        res.status(500).json({message: "Internal server error"})
    }
};

// GETTING CATEGORY-WISE REPORT
module.exports.getCategoryReport = async (req, res) => {
    try {
        const {category} = req.query;
        if(!category) 
            return res.status(400).json({message: "category query param is required"});

        const expenses = await Expense.find({
            userId: req.user.uid,
            category,
        }).select("id title amount date");

        if(!expenses.length)
            return res.status(200).json({message: "No expenses found for this category", data: {}})

        res.status(200).json(expenses)
    } catch (error) {
        console.log("Error in getCategoryReport: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}