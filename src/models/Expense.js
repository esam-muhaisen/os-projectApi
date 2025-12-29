const {Schema, default: mongoose} = require("mongoose")

const ExpenseSchema = Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum:["rent","treatment","food","transportation"],
        required:true
    },
    month:{
        type:Number,
        required:true,
        
    }
},{
    timestamps: true
})

const Expense = mongoose.model("expense",ExpenseSchema)

module.exports = {
    Expense
}

