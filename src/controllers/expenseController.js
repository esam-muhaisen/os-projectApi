const asyncHandler = require("express-async-handler")
const { formatResponse } = require('../utils/responseFormatter');
const {Expense} = require("../models/Expense")
const {Income} = require('../models/Income')


module.exports.expenseController = asyncHandler(async(req,res,next)=>{

    try {
        const { amount, type, month } = req.body;
        const id = req.user.id;

        if(!amount || amount <= 0){
            return res.status(400).json(formatResponse(false,"the amount should be found and grater than 0."))

        }
        if (!type || !["rent", "treatment", "food", "transportation"].includes(type)) {
            return res.status(400).json(formatResponse(false, "The type is not valid."));
        }

        const currentDate = new Date();
        const currentmonth =  currentDate.getMonth() + 1;      

        const expense = new Expense({
            userId: id,
            amount,
            type,
            month:currentmonth
        });
        await expense.save();

        return res.status(200).json(
            formatResponse(true, " Expenses added successfully.", {
            userId: id,
            amount,
            type,
            month:currentmonth
            })
        );


    } catch (error) {
        return res.status(400).json(formatResponse(false,"cant enter the Expenses"))

    }
})

module.exports.reviewExpenseList= asyncHandler(async(req,res)=>{
    try {
        const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const id = req.user.id;


    const expenses = await Expense.find({
        userId: id,
        month: currentMonth 
        });
    if(expenses == 0){
        return res.status(400).json(
            formatResponse(false, "This user dont have any expenses in the currently month.")
        );
    }    



    return res.status(200).json({
        message: "Expenses for the current month.",
        expenses: expenses,
    })
    } catch (error) {
        return res.status(400).json(formatResponse(false,"there is an error reviewExpenseList request"))

    }
    
})


module.exports.TotalRemainingAvg= asyncHandler(async(req,res)=>{




    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const id = req.user.id;
    
        let thismonth = await Expense.find({month:currentMonth,userId:id})
        
    
        const month = thismonth[0].month;
    
        let TotalMonthlyExpenses = 0;
        for (let i = 0; i < thismonth.length; i++) {
            TotalMonthlyExpenses += thismonth[i].amount;
        }
    
        let getmonthlyIncome = await Income.findOne({userId: id})
    
        if(!getmonthlyIncome){
        return res.status(400).json(formatResponse(false,"user doesn't  have monthly income please add it "))
    }
        const thismonthincome = getmonthlyIncome.monthlyIncome;
        const remainderOfMonth = thismonthincome - TotalMonthlyExpenses;
    
        if(remainderOfMonth <= 0){
            return res.status(400).json(formatResponse(false,"The remainder of the month's income 0 or less than 0"))
    
        }
        const now = new Date();
        const currentYear = now.getFullYear(); 
        const daysInMonth = new Date(currentYear, month, 0).getDate(); 
    
        const averageDailyExpense = (thismonthincome - remainderOfMonth) / daysInMonth;
        
        const averageDay = averageDailyExpense.toFixed(2);
    
    
    
        return res.status(200).json(formatResponse(true,"Total and Remaining and Average Day for this user .",{
    
            TotalMonthlyExpenses,
            remainderOfMonth:remainderOfMonth,
            averageDailyExpense:averageDay,
        }))
    } catch (error) {
        return res.status(400).json(formatResponse(false,"there is an error in TotalRemainingAvg request"))

    }

})


module.exports.getExpensesByType = asyncHandler(async(req,res)=>{
    


    try {
            const id = req.user.id; 

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; 
        
            
            const expenseTypes = ["transportation", "food", "treatment", "rent"];
        
            let arrayOfTypes = [];
        
            for (let type of expenseTypes) {
            const expenses = await Expense.find({ 
                month: currentMonth, 
                type: type,
                userId: id 
            });
        
            let TotalAmount = 0;
            for (let i of expenses) {
                TotalAmount += i.amount;
            }
        
            arrayOfTypes.push({
                type: type,
                TotalAmount: TotalAmount,
            });
        }
    
        return res.status(200).json(formatResponse(true,"Review of expense types statistics",arrayOfTypes))
    
    } catch (error) {
        return res.status(400).json(formatResponse(false,"there is an error in getExpensesByType request"))

    }
})
