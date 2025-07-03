let jwt = require('jsonwebtoken')
require('dotenv').config()

let verifyToken = (req,res)=>{
    try {
        
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message: 'Access Denied',
                auth:false
            })
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        return res.status(200).json({
            message: 'Verified',
            auth: true
        })
    } catch (error) {
        return res.status(500).json({message:'Internal server issue'})
    }
}


module.exports = verifyToken;