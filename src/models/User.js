const {Schema, default: mongoose} = require("mongoose")
const jwt = require("jsonwebtoken")


const UserSchema = Schema({
    username:{
        type:String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100 
    },
    email:{
        type:String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minlength: 8,

    }
},{
    timestamps: true
});

// generate token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET)
}

const User = mongoose.model("User",UserSchema)



module.exports = {
    User
}


