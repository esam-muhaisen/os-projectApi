
const joi = require("joi")


// validate register user
function validateRegister(obj){
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100).required(),
        email: joi.string().trim().min(5).max(100).email().required(),
        password: joi.string()
        .pattern(new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$'))
        .trim().min(8).required()
    });
    return schema.validate(obj)
}
// validate login user
function validateLoginUser(obj){
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email().required(),
        password: joi.string()
        .pattern(new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$'))
        .trim().min(8).required()
    });
    return schema.validate(obj)
}


module.exports = {
    validateLoginUser,
    validateRegister
}