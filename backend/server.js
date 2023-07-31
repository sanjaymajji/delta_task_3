
const express= require("express")
const mongoose= require("mongoose");
const cors= require('cors')
const app = express();
const bycrt= require("bcrypt")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
var cookieParser = require('cookie-parser')


app.use(cookieParser())



//profile model
const profile= mongoose.Schema({
    name:{
        type:"String",
        required:true,
    },
    gmail:{
        type:"String",
        required:true,
    },
    gender:{
        type:"String",
        required:true,
    },
    interest:{
        type:"String",
        required:true,
    },
    password:{
        type:"String",
        required:true,
    },

    score:{
        type:"Number",
        required:true,
    },
    tokens:[{
        token:{
            type:"String",
        required:true,
        }
    }],
    



})

//jwt token
profile.methods.gentoken= async function(){
    try {
        const token= await jwt.sign({_id:this._id},"iamverygoodgirltoldbymyteachermydearbrother")
        this.tokens= this.tokens.concat({token:token})
        await this.save()

        console.log(token)
        
        return token;
    } catch (error) {

        console.log(error)
        
    }
}

//HASHING
profile.pre('save',async function(next){


   
    
  if(!this.isModified('password')){
    next()
  }
  const salt= await bycrt.genSalt(10)
  this.password= await bycrt.hash(this.password,salt)
  
   console.log(this.password)

    
})


const Profile= mongoose.model("Prof",profile)


profile.path('score')
    .default(0)
//questions model
const quiz= mongoose.Schema({
    question:{
        type:"String",
        required:true,
    },
    opt1:{
        type:"String",
        required:true,
        
    },
    opt2:{
        type:"String",
        required:true,
    },
    opt3:{
        type:"String",
        required:true,
    },
    opt4:{
        type:"String",
        required:true,
    },
    crt_ans:{
        type:"String",
        required:true,
    },
    user_name:{
        type:"String",
        required:true,
    }
})

const Quiz= mongoose.model("question",quiz);



mongoose.connect("mongodb+srv://sanjay:sanju18cj@cluster0.zxovxim.mongodb.net/",{
    useNewUrlParser:true,
    
    useUnifiedTopology:true,
    
}).then((result)=>{
    console.log("const");
}).catch((err)=>{
console.log(err);
})

const jwt = require('jsonwebtoken');
let auth= async (req,res, next)=>{
    const token =req.cookies.jwt;
    console.log(token)
    try {
        const verifytoken=jwt.verify(token,"iamverygoodgirltoldbymyteachermydearbrother")
        
        const rootuser= await Profile.findOne({_id: verifytoken._id,"tokens.token":token})

        if(!rootuser){
            throw new Error("not found")
        }
        req.token=token
        req.rootuser=rootuser;
        req.userID=rootuser._id
        next()
    } catch (error) {
        res.clearCookie("token")
        console.log(error)
    } 
}



//DATA FROM REG
app.post("/register",async (req,res)=>{


    const {name,gmail,gender,interest,password,score}=req.body
    
    if(!name||!gmail||!gender||!interest||!password){
      return res.status(422).json({error:"error"})
    }
    try {
        const legUser=await Profile.findOne({gmail:gmail})

        
        if(legUser) return res.status(422).json({error:"already exist"})

    const pr= new Profile({name,gmail,gender,interest,password,score})

    
    

    
        

        const userReg=await pr.save()
        res.json("done");
      
        console.log(userReg)
        
        
    } catch (error) {
        console.log(error)
    }

})




//login verification
app.post("/",async (req,res)=>{

    const {gmail,password}=req.body

    try {


    console.log(req.body);
    
    if (!gmail||!password) {
        return res.json({error:"pls fill all forms"})
    }
    const userLogin= await Profile.findOne({gmail:gmail})
    
   
    const Mathing= await bycrt.compare(password,userLogin.password);
    console.log(password)
    console.log(userLogin.password)
    const tokenn = await userLogin.gentoken()
    
    console.log(Mathing)
    if(!Mathing){
        res.json({error: "nahhhh"})
    }
    else{
        res.cookie("jwt",tokenn,{
            expires: new Date(Date.now()+25892000000),
            
            httpOnly:true
        })
        res.json({mess: "done buddy"})
    }



        
    } catch (error) {
        console.log(error)
    }

    
})

//*******quiz******// 
app.post("/create",async (req,res)=>{

    const {question,opt1,opt2,opt3,opt4,crt_ans,user_name}=req.body
    console.log(!question||!opt1||!opt2||!opt3||!opt4||!crt_ans||!user_name)

    if(!question||!opt1||!opt2||!opt3||!opt4||!crt_ans||!user_name){

    return res.status(422).json({error:"error"})

    }
    


    try {
        const legUser=await Quiz.findOne({question:question})
        if(legUser) return res.status(422).json({error:"already exist"})

    const pr= new Quiz({question,opt1,opt2,opt3,opt4,crt_ans,user_name,score})
        pr.score=0;
        console.log(pr.score)
        const userReg=await pr.save()
res.json("done")
        
        console.log(userReg)
        
        
    } catch (error) {
        res.json("fail")
        console.log(error)
    }

})

app.get('/data',(req,res)=>{
    
    
    

Quiz.find({}).then(user=> res.json(user)).catch(err=>console.log(err))

     
})

app.post('/data',async(req,res)=>{
    const {enter_name,score}=req.body
   

console.log(req.body.player)
    try {
        
        let pr_prime_score=await Profile.findOne({name:req.body.player})
        req.body.score=pr_prime_score.score+req.body.score
        
            
      let pr= await Profile.findOneAndUpdate({name:req.body.player},{score:req.body.score})
      console.log(pr.score)
        res.json(pr.score)
    } catch (err) {
        console.log(err)
    }
    

// Quiz.find({}).then(user=> res.json(user)).catch(err=>console.log(err))

     
})



//search for friends
app.post('/profpic',(req,res)=>{


if(req.body.player){

    Quiz.find({user_name:req.body.player}).then(user=> res.json(user)).catch(err=>console.log(err))
    Profile.find({name:req.body.player}).then(user=> res.json(user)).catch(err=>console.log(err))
    // if(!(Quiz.find({user_name:req.body.player}).then(user=> res.json(user)).catch(err=>console.log(err)))){
    //     res.json("invalid name or user doesn't exist")
    // }

}
else{
    res.json("user doesn't exist")
}
     
})
app.get("/myprofpic",auth,(req,res)=>{
    console.log("hiiiiiiii")
    res.send(req.rootuser)
})






app.listen(3090,()=>{
    console.log("hello")
})
