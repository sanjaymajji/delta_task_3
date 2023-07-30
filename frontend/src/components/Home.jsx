import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'

const Home=()=> {
  return (
    <>
    <div class="navbar">


<input class="input" type="text" placeholder="Search.."/>
<h2>QUIZHU</h2>
  <li><Link class="active" to="/propic">profile</Link></li>
 
 
    
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
