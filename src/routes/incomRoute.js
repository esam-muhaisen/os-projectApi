const routerIncom = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { incomeMonthlySetting } = require("../controllers/incomeSettings");


// /api/income/settings
routerIncom.post("/settings",verifyToken,incomeMonthlySetting)



module.exports = routerIncom