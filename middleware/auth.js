const jwt = require('jsonwebtoken')

const test_temp ='nenglkealkzfn$arar' 

const auth = ((req,res,next)=>{
    const token = req.headers.authorization

    console.log(token)
    jwt.verify(token, test_temp);
    next()
})

module.exports = auth