
const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true}
})

const user = mongoose.model('user',userSchema)



module.exports = user








// const userModel = mongoose.model() 
// main().catch(err => console.log(err));
// main().then(msg => console.log("connecter ajomi",msg));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Mongose');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// const urlSchema = new mongoose.Schema({
//     name :{type:String, required:true},
//     email:{type:String, required:true},
//     password:{type:String, required:false},  
//     timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }  
// })

