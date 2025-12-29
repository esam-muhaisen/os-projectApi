const { expenseController, reviewExpenseList, TotalRemainingAvg,getExpensesByType } = require("../controllers/expenseController");
const { verifyToken } = require("../middlewares/verifyToken");

const routerExpense = require("express").Router();


// /api/expense/addexpense
routerExpense.post("/addexpense",verifyToken,expenseController)
// /api/expense/currentMonth
routerExpense.get("/currentMonth", verifyToken,reviewExpenseList)
// /api/expense/TotalRemainingAvg
routerExpense.get("/TotalRemainingAvg",verifyToken,TotalRemainingAvg)

// /api/expense/getExpensesByType
routerExpense.get("/getExpensesByType",verifyToken,getExpensesByType)



module.exports = {
    routerExpense
}

