const express = require('express')
const jwt = require('jsonwebtoken')

const user = require('../model/user')
const router = express.Router()

router.use(express.json())



router.post('/links',(req,res)=>{
    let {url,note,tags} = req.body();
})