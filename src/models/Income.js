const {Schema, default: mongoose} = require("mongoose")

const IncomeSchema = Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    monthlyIncome:{
        type:Number,
        required: true
    }
},{
    timestamps:true
})
const Income= mongoose.model("income",IncomeSchema)

module.exports = {
    Income
}
