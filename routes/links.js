const express = require('express')
const link  = require('../model/link')
const auth = require('../middleware/auth')
const user = require('../model/user')


const router = express.Router()


router.post('/links',auth,(req,res)=>{
    if(req.user){
        console.log(req.user)
    res.send('hy')
    }else{
           console.log('no req.user found')
        res.status(401).send('Unauthorized')
    }
   
})

module.exports = router