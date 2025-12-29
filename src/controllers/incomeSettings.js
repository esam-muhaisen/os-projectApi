const asyncHandler = require("express-async-handler")
const { formatResponse } = require('../utils/responseFormatter');
const {Income} = require('../models/Income')
const {User} = require("../models/User")

module.exports.incomeMonthlySetting = asyncHandler(async(req,res,next)=>{

    try {
        const { monthlyIncome } = req.body;
        const id = req.user.id; 

        if (!monthlyIncome || monthlyIncome <= 0) {
            
        return res.status(400).json(formatResponse(true,"Invalid income."))
        }

        const exist = await Income.findOne({ userId: id });

        if (exist) {
          exist.monthlyIncome = monthlyIncome;
          await exist.save();
    
          return res.status(200).json(
            formatResponse(true, "Monthly income successfully updated.", {
              userId: id,
              monthlyIncome,
            })
          );
        }




        const createIncome = new Income({
            userId: id,
            monthlyIncome,
        });

        await createIncome.save();

        return res.status(201).json(
            formatResponse(true, "Monthly income successfully added.", {
            userId: id,
            monthlyIncome,
            })
        );

    } catch (error) {
        return res.status(400).json(formatResponse(false,"cant enter the incom monthly"))

    }


})


