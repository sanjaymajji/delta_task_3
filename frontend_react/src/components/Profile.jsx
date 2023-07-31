import axios from 'axios';
import React,{ useEffect, useState } from 'react'

function Profile() {
    const [user,setuser]=useState()

    const [name,setname]= useState();
      const [gmail,setgmail]= useState();
      const [gender,setgender]= useState();
      const [interest,setinterest]= useState();
      const [score,setscore]= useState("not taken test yet")
    
    
    
    useEffect(() => {
      // prof_deitals()
      axios.get("/myprofpic").then((res)=>{
        console.log(res.data)
    
        setname(res.data.name)
        setgmail(res.data.gmail)
        setgender(res.data.gender)
        setinterest(res.data.interest)
        setscore(res.data.score)
      }).catch((Err)=>console.log(Err))
      }, []);
    
      
      return (
        <>
        <p>working</p>
        <h5>NAME : {name}</h5>
      <h5>GMAIL : {gmail}</h5>
      <h5>GENDER : {gender}</h5>
      <h5>INTEREST : {interest}</h5>
      <h5>score : {score}</h5>
      
    
    
    
        
        
        </>
        
      );
}

export {Profile};





