const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User} = require("../models/User")
const { formatResponse } = require('../utils/responseFormatter');
const { validateRegister, validateLoginUser} = require("../validators/userValidator");



module.exports.registerUserCtrl = asyncHandler(async(req,res)=>{
    try {
        const {error} = validateRegister(req.body);
        if(error){
            return res.status(400).json(formatResponse(false,{message: error.details[0].message}))
    
        }
     
        let nameuser = await User.findOne({username:req.body.username})
        if(nameuser){
            return res.status(400).json(formatResponse(false,"username already exist"))
    
        }
    
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json(formatResponse(false,"email already exist"))
    
        }
    
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json(formatResponse(true,"you registered successfully, please log in"))
    } catch (error) {
        return res.status(400).json(formatResponse(false,"cant sign up"))

    }
  
})

module.exports.loginUserCtrl = asyncHandler(async(req,res)=>{
    try {
        const {error} = validateLoginUser(req.body);
        if(error){
            return res.status(400).json(formatResponse(false,error.details[0].message))
        }
    
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json(formatResponse(false,"invalid email or password"))
        }
    
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json(formatResponse(false,"invalid email or password"))
        }
    
        const token = user.generateAuthToken();
    
        res.status(200).json({
            _id: user._id,
            token: token,
        })

        return res.status(200).json(formatResponse(true,"loged in successfully",{
            _id: user._id,
            token: token,
        }))

    } catch (error) {
        return res.status(400).json(formatResponse(false,"cant log in"))

    }
   
    

})

