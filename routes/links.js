const express = require('express')
const link  = require('../model/link')
const auth = require('../middleware/auth')
const user = require('../model/user')


const router = express.Router()


router.post('/links',auth, async(req,res)=>{
    if(req.user){
        console.log(req.user)
        let {url,title,description,note,tags} = req.body
        const user_Id = req.user.userId

        const created_urls = await link.create({
            userId:user_Id,
            url:url,
            title:title,
            description:description,
            note:note,
            tags:tags,
        })
        if(created_urls){
            res.end('Created Succefully')
        } else{
            res.end('Something wrong')
        }
        // res.send('hy')
        console.log('Hy')
    }else{
           console.log('no req.user found')
        res.status(401).send('Unauthorized')
    }
   
})


router.get('/my-links',auth, async(req,res)=>{
    // let {url,title,description,note,tags} = req.body;

    const user_Id = req.user.userId

    const user_db = await link.find({userId:user_Id})
    console.log(user_db)

    if(user_db){
        return res.json(user_db)
    }

})

module.exports = router