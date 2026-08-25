// const server = require('../server')
const bcrypt = require('bcrypt')

const express = require('express')
const app = express()
const user = require('../model/user')
const mongoose  = require('mongoose')

const saltRounds = 15

const router = express.Router()

router.use(express.json());


//Route of the first page display 
router.get('/',(req,res)=>{
    console.log("geg")
    res.send('res')
})


router.post('/register', async (req,res)=>{
    console.log("wawas")
    // res.send('res')
    let {name,email,password} = req.body;


    const hashedPassword = await bcrypt.hash(
        password,
        saltRounds
    )

  const newUser = await user.create({
    name:name,
    email:email,
    password:hashedPassword
  })
  res.send('Done')
})

module.exports = router




// const schema = new mongoose.Schema({name:String, email:String, password:String})
// const Tank = mongoose.model('Tank', schema);