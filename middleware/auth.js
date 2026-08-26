const jwt = require('jsonwebtoken')

const test_temp ='nenglkealkzfn$arar' 

const auth = ((req,res,next)=>{
    const authHeader = req.headers.authorization
    // console.log(token)
    const token = authHeader.split(' ')[1]
    try{
        const jwit = jwt.verify(token,test_temp);
        req.user = jwit
        console.log(req.user)
        if(jwit){
            console.log('good')
        } else{
            console.log('Err')
        }
    } catch(err){
        console.log(err.message)
        return res.send("Something al3awd",err)
    }

    

    next()
})

module.exports = auth