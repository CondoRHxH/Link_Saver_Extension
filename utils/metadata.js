const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

metadata = express.Router()


metadata.get('/:url', async(req,res)=>{

    try{

        const target = req.params.url.startsWith('http') 
      ? req.params.url 
      : `https://${req.params.url}`;

        const dataFrom = await fetch(target);
        const html = await dataFrom.text();

        res.send(html); // or res.json({ html })
        console.log('this is the link entererd',target)
        // const cherio_url = cheerio.load(/<title>([^<]*)<\/title>/)

        const $ = cheerio.load(html);
        
        const title_html = $('title').text()
        // const url= req.params.url

        console.log('The title ',title_html)
        // console.log(cherio_url)
        // const dataFrom = await fetch(req.params.url)
        // console.log("haadad data",dataFrom)
        // const html = await dataFrom.text();

        // console.log("Hada HTML",html)
    } 

    catch(err){
        console.log('errer')
    }
})


module.exports = metadata
