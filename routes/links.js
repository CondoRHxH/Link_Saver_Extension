const express = require('express')
const link  = require('../model/link')
const auth = require('../middleware/auth')
const user = require('../model/user')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()


router.post('/links-add/:url',auth, async(req,res)=>{
    if(req.user){
        console.log(req.user)
        let {description,note,tags} = req.body

        

        const user_Id = req.user.userId
        if (!req.params.url) {
            return res.status(400).json({
                error: 'URL is required'
            })
        }

        // URL must be a string
        if (typeof req.params.url !== 'string') {
            return res.status(400).json({
                error: 'URL must be a string'
            })
        }

        if (tags && !Array.isArray(tags)) {
            return res.status(400).json({
                error: 'Tags must be an array'
            })
        }
        try{
        
            const target = req.params.url.startsWith('http') 
            ? req.params.url 
            : `https://${req.params.url}`;
        
            const dataFrom = await fetch(target);
            const html = await dataFrom.text();
        
            // res.send(html); // or res.json({ html })
            console.log('this is the link entererd',target)
            console.log('this is the html',html)

            // const cherio_url = cheerio.load(/<title>([^<]*)<\/title>/)
        
            const $ = cheerio.load(html);
                
            const title_html = $('title').text()
            // const url= req.params.url
        
            console.log('The title ',title_html)
            // console.log(cherio_url)
            // const dataFrom = await fetch(req.params.url)
            // console.log("haadad data",dataFrom)
            // const html = await dataFrom.text();
            const created_urls = await link.create({
                userId:user_Id,
                url:target,
                title:title_html,
                description:description,
                note:note,
                tags:tags,
            } )
            console.log("Hada HTML",html)
            res.send('Done ajomiiiii')
            
            }catch(err){
                console.log('errer')
            }

        
        // try{
        //     const created_urls = await link.create({
        //     userId:user_Id,
        //     url:url,
        //     title:title,
        //     description:description,
        //     note:note,
        //     tags:tags,
        // })
        //     res.status(201).json("good")
        // }catch(err){
        //     res.status(500).json('nope')
        // }


        // if(created_urls){
        //     res.end('Created Succefully')
        // } else{
        //     res.end('Something wrong')
        // }
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


router.delete('/my-links-del/:url',auth, async(req,res)=>{
    const user_db = await link.findOne({
        url:req.params.url,
        userId:req.user.userId
    })
    console.log("hadiii user",user_db)

    const del_db = await link.findOneAndDelete({_id:user_db.id})
    console.log("hada bodddydyy",req.body)
    console.log("hada dbbbb",del_db)

    if(del_db){
        res.end('Deleted Succefully')
    } else{
        res.end('NOt deleted')
    }
})

module.exports = router
