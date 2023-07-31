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
        


        <h3>NAME : {name}</h3>
      <h3>GMAIL : {gmail}</h3>
      <h3>GENDER : {gender}</h3>
      <h3>INTEREST : {interest}</h3>
      <h3>score : {score}</h3>
        
   
        </>
        
      );
}

export {Profile};





