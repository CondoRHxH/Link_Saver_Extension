const mongoose = require('mongoose')
const express = require('express')


const router = require('./routes/auth')
const linksRouter = require('./routes/links')

const app = express()

app.use('/',router)
app.use('/',linksRouter)
app.use('/fetch', require('./utils/metadata')) //To test out any route if it is working



async function connection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp');

}

app.use('/', require('./routes/links')) //To test out any route if it is working




connection().then(msg => console.log('connection good', msg)).catch(err => console.log(err))


app.listen(3000,()=>{
    console.log('app started')
})

module.exports = {mongoose,express,app}
