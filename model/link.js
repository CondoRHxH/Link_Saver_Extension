const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref: 'user'},
    url:{type:String,required:true},
    title:{type:String},
    description:{type:String},
    note:{type:String},
    tags:{type:[String]},
    isRead:{type:Boolean,default:false},
},
{ timestamps: true }
)

const link = mongoose.model('link',linkSchema)

module.exports = link