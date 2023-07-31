import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"

const Reg =()=> {

  let ship=useNavigate()
  
  const [gmail,setgmail]= useState();
  const [password,setpassword]= useState();
  const [test,settest]=useState(0)
  
function submit(e){

  e.preventDefault()


  axios.post("/",{
    gmail,password
  }).then((res)=>{
    let a=res.data
    
    if("done buddy"==a.mess){
     ship("/home")
    }
    else{
      alert("invail user id or password")
    }
  }).catch((err)=>{
    console.log(err)
    settest("err")
  })
}



 
  return (
    <>
    
    <h1>QuizHub</h1>
     <form method="POST" onSubmit={submit}>
      
      <label >GMAIL</label>
      <input type="text" name='mail_data'onChange={(e)=>{
        setgmail(e.target.value)
      }}/>
      
      

<label >PASSWORD</label>
      <input type="text" name='name_data' onChange={(e)=>{
        setpassword(e.target.value)
      }}/>

    <button type='submit'>
     

    login

    </button>
    

    </form>
    {/* <button>
      <Link to="/home">login</Link>
    </button> */}
    <div className='dumbstars'>
      <p>new here</p>
      <button>
      <Link to="/register">register</Link>
    </button>
      
    </div>
    
    </>
    
  );
};

export {Reg};





