import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Play.css';

const Play = () => {
  const [user, setUser] = useState([]);
  const [score, setscore] = useState(0);
  const [player,setplayer]=useState()
  

  useEffect(() => {
    axios.get("http://localhost:3090/data")
      .then((response) => {
    
        setUser(response.data);
        console.log(response.data)
        
      })
      .catch((err) => console.log(err));
  }, []);

  
  function submit(e){

  e.preventDefault()


  axios.post("http://localhost:3090/data",{
    player,score
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
<form method="post" onSubmit={submit}>
      <h3>submit score</h3>
      <input type="text" placeholder="enter your username"onChange={(e)=>{
        setplayer(e.target.value)
      }}/>

<button type='submit'>
     

     done
 
     </button>
      </form>
    </>
  );
};

export { Play };
