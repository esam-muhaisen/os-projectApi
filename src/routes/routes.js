const authRoute = require("./authRoute");
const { routerExpense } = require("./expense");
const routerIncom = require("./incomRoute")


module.exports = (app)=>{
    app.use('/api/auth',authRoute),
    app.use("/api/income",routerIncom),
    app.use('/api/expense',routerExpense)
}


