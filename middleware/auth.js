const jwt = require('jsonwebtoken')

const test_temp ='nenglkealkzfn$arar' 

const auth = ((req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    try{
        const jwit = jwt.verify(token,test_temp,{ complete: true });
        if(jwit){
            console.log('good')
        } else{
            console.log('Err')
        }
    } catch(err){
        return res.send("Something al3awd",err)
    }

    

    next()
})

module.exports = auth