import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Create.css';

const Create=()=> {
  const ship= useNavigate()
let [question,setquestion]=useState();
let [opt1,setopt1]=useState()
let [opt2,setopt2]=useState()
let [opt3,setopt3]=useState()
let [opt4,setopt4]=useState()
let [crt_ans,setcrt_ans]=useState()
let [user_name,setuser_name]=useState()


let confrim_save = (e)=>{
  e.preventDefault()


axios.post("http://localhost:3090/create",{
      question,opt1,opt2,opt3,opt4,crt_ans,user_name
    }).then((res)=>{
      
      ship("/play")
    })
  
  
}


  
  return (
    <>
    <form method="post" onSubmit={confrim_save}>
    <h3>QUESTIONS</h3>
    
<input type="text" className='question'onChange={(e)=>{
        setquestion(e.target.value)
      }}/>

 <h3>OPTIONS</h3>
 <div className="options">


    <input type='text' placeholder='option 1'  onChange={(e)=>{
        setopt1(e.target.value)
      }}/>    
    <input type='text' placeholder='option 2'onChange={(e)=>{
        setopt2(e.target.value)
      }}/>  
    <input type='text' placeholder='option 3'onChange={(e)=>{
        setopt3(e.target.value)
      }}/>  
    <input type='text' placeholder='option 4'onChange={(e)=>{
        setopt4(e.target.value)
      }}/>  
 </div>

 <h3>CORRECT ANSWER</h3>
 <div className='save'>

  
 <input type='text' placeholder='correct answer'onChange={(e)=>{
        setcrt_ans(e.target.value)
      }}/>  
      <input type='text' placeholder='name'onChange={(e)=>{
        setuser_name(e.target.value)
      }}/>  

 <button type='submit'>
     

    SAVE

    </button>

 </div>

 
    </form>
    </>
    
    
  );
};

export {Create};
