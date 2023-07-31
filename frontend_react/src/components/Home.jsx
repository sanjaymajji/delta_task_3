import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'

const Home=()=> {
  return (
    <>
    <div class="navbar">

  <li><Link class="active" to="/propic">PLAYERS QUIZ</Link></li>
  <li><Link class="active" to="/myprofpic">MY PROFILE</Link></li>
 
 
    
</div>
 
    <div className="create_quiz">
      <Link to='/create'>
      <h1 className='h1'>CREATE QUIZ</h1>
      </Link>
      
    </div>
    <div className="play_quiz">
    <Link to="/play"><h1 className='h1'>PLAY QUIZ</h1></Link>
      
    </div>

    
    </>
    
  );
};

export {Home};
