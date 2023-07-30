import axios from 'axios';
import React,{ useEffect, useState } from 'react'


const Profpic =()=> {
  const [user, setUser] = useState([]);
  const [score, setscore] = useState(0);
  const [player,setplayer]=useState()
  

  
  
  function submit(e){

  e.preventDefault()


  axios.post("http://localhost:3090/profpic",{
    player
  }).then((res)=>{


    setUser(res.data);
    console.log(res.data)


  }).catch((err)=>{
    console.log(err)

  })
}





  function check(input,ans){

    
    if(input==ans){
      alert("ur right")
      setscore(score+1);

    }
    else{
      alert("wrong")
    }
    
  }




  
  return (
    <>

<form method="post" onSubmit={submit}>
      
      <input type="text" placeholder="enter your username"onChange={(e)=>{
        setplayer(e.target.value)
      }}/>

<button type='submit'>
     

     search
 
     </button>
      </form>



    


      <h1>score</h1>
    <h3>{score}</h3>

    
      {user.map((user) => (
        <div >
          <h2 className='dis'>{user.question}</h2>
          <div className="main">
            <div>
              <button className="right" onClick={()=>check(user.opt1,user.crt_ans)}>{user.opt1}</button>
              <button className="right" onClick={()=>check(user.opt2,user.crt_ans)}>{user.opt2}</button>
            </div>
            <div>
              <button className="left" onClick={()=>check(user.opt3,user.crt_ans)}>{user.opt3}</button>
              <button className="left" onClick={()=>check(user.opt4,user.crt_ans)}>{user.opt4}</button>
            </div>
          </div>
        </div>
      ))}



    
    
    </>
    
  );
};

export {Profpic};