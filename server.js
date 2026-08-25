const mongoose = require('mongoose')
const express = require('express')
const router = require('./routes/auth')

const app = express()

app.use('/',router)

async function connection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp');

}
connection().then(msg => console.log('connection good ',msg))

connection().catch(err => console.log(err))



app.listen(3000,()=>{
    console.log('app started')
})

module.exports = {mongoose,express,app}
