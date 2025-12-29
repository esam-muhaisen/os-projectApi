const jwt = require("jsonwebtoken");
const { formatResponse } = require('../utils/responseFormatter');



function verifyToken(req,res,next){
    const authToken= req.headers.authorization;
    
    if(authToken){
        const token = authToken.split(" ")[1];
        
        try{
            const decodedPayload = jwt.verify(token , process.env.JWT_SECRET)
            req.user = decodedPayload;
            next();
        }catch(error){
            return res.status(401).json(formatResponse(false,"invalid token"))
            
        }
    }else{
        return res.status(401).json(formatResponse(false,"no invalid provided please add token"))
    }
}

module.exports={
    verifyToken
}

