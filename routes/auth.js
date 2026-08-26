const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const user = require('../model/user')
const auth = require('../middleware/auth') 

const saltRounds = 10

const router = express.Router()

router.use(express.json());


//Route of the first page display 
router.get('/',(req,res)=>{
    res.send('res')
})


router.post('/register', async (req,res)=>{
  let {name,email,password} = req.body;


  const hashedPassword = await bcrypt.hash(password,saltRounds)

  const newUser = await user.create({
    name:name,
    email:email,
    password:hashedPassword
  })
  res.send('Done')
})

const test_temp ='nenglkealkzfn$arar'

router.post('/login',async(req,res)=>{
  try{  

    let {name,email,password} = req.body;
    

    const db_email  = await user.findOne({ email });

    if(!db_email){
      return res.end('no User found')
    }

    if(db_email.email === email){
      const UncryptedPass = await bcrypt.compare(password,db_email.password)
      if(UncryptedPass){
        const token = jwt.sign(db_email.name, test_temp);
        res.json({
          message : 'Fin al3awd tfdl, and MRHHHHHHHHHBA',
          jwt :token
        })
        // res.end('mrhba bik again')
      } else {
        res.end('GO REGISTER NOOOOOOOOOW')
      }
    }

  } catch(err){
    res.status(500).json({ error: err.message });
  }








  // const user = await user.findOne({ name:req.body.name,email: req.body.email, password:req.body.password }); 
  // console.log(user)
  

  // await MyModel.find({ name: name, email: email,password: UncryptedPass}).exec();


})

module.exports = router




// const schema = new mongoose.Schema({name:String, email:String, password:String})
// const Tank = mongoose.model('Tank', schema);