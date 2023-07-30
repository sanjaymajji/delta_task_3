import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"


const Login=()=> {
  const ship=useNavigate()
  const [name,setname]= useState();
  const [gmail,setgmail]= useState();
  const [gender,setgender]= useState();
  const [interest,setinterest]= useState();
  const [password,setpassword]= useState();
  const [cpassword,setcpassword]= useState();
  function confrim_submit (e){
    e.preventDefault()
    
    axios.post("http://localhost:3090/register",{
      name,gmail,gender,interest,password,cpassword
    }).then((res)=>{
      if(res.data=="done"){
        ship("/")
      }
      else{
        alert("something went wrong")
      }
    })
    




  }
  return (
    <>
    <h1>QuizHub</h1>
     <form method="POST" onSubmit={confrim_submit}>
      <label >NAME</label>
      <input type="text" name='name_data' onChange={(e)=>{
        setname(e.target.value)
      }}/>

      <label >GMAIL</label>
      <input type="text" name='mail_data'onChange={(e)=>{
        setgmail(e.target.value)
      }}/>
      
      <label >GENDER</label>
      <input type="text" name='gender_data'onChange={(e)=>{
        setgender(e.target.value)
      }}/>
      
      <label >INTEREST</label>
      <input type="text" name='interest_data'onChange={(e)=>{
        setinterest(e.target.value)
      }}/>

<label >PASSWORD</label>
      <input type="text" name='password_data' onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
<label >CONFIRM PASSWORD</label>
      <input type="text" name='confirm_password_data' onChange={(e)=>{
        setcpassword(e.target.value)
      }}/>

    <button type='submit'>
     

    confirm

    </button>

    </form>
    {/* <button>
      <Link to="/home">login</Link>
    </button> */}

    <div className='dumbstars'>
      <p>already have accout</p>
      <button>
      <Link to="/">log in</Link>
    </button>
      
    </div>
    
    </>
    
  );
};

export {Login};
