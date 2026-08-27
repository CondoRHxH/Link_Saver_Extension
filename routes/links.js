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
    

    if(user_db){
        return res.json(user_db)
    }

})

router.get('/my-links/:url',auth, async (req,res)=>{
    // const user_Id = req.user.userId
    // console.log('user idididid',user_Id)
    
        const user_db = await link.findOne({
            url: req.params.url,
            userId: req.user.userId
        })
        console.log('user dbdbbdbdbdb',user_db)
        res.json({
            url: req.params.url,
            userId: req.user.userId
        })
        // res.json(user_Id.url)

})


router.post('/my-links-change/:url',auth, async(req,res)=>{

    const user_db = await link.findOne({
        url : req.params.url,
        userId:req.user.userId
    })
    console.log('hada bodyyd',req.body)
    
    const change_db = await link.findOneAndUpdate(user_db,req.body)

    if(change_db){
        res.end('Changed')
    }else{
        res.end('No change')
    }
})
module.exports = router