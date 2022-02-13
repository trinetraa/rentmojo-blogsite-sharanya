import './App.scss';
import HomePage from './components/HomePage';
import UserPosts from './components/UserPosts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostDetails from './components/PostDetails';



function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' exact element={<HomePage/>}/>
          <Route path='/user-posts' exact element={<UserPosts/>}/>
          <Route path='/post-details' exact element = {<PostDetails/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
