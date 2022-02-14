import './App.scss';
import HomePage from './components/HomePage';
import UserPosts from './components/UserPosts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostDetails from './components/PostDetails';
import { useState } from 'react';



function App(){
  const [mode,setMode]=useState("Dark Mode");

  const modeChangeHandler=()=>{
    if(mode=='Light Mode')
    setMode("Dark Mode");
    else setMode("Light Mode");
  }


  return (
    <>
    <Router>
      <div className={`App ${mode=='Light Mode'?'dark':'light'}`}>
        <div className='theme-switcher'><button className='mode-toggle' onClick={modeChangeHandler}>{mode}</button></div>
        <Routes>
          <Route path='/' exact element={<HomePage/>}/>
          <Route path='/user-posts' exact element={<UserPosts/>}/>
          <Route path='/post-details' exact element = {<PostDetails/>}></Route>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
