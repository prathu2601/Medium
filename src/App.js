import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './Components/Main';
import PostDetails from './Components/PostDetails';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Author from './Components/Author';
import CreateBlog from './Components/CreateBlog';
import EditBlog from './Components/EditBlog';


const router = createBrowserRouter([
  {
    path:'/',
    element:<Main/>
  },{
    path:'/post/:postId',
    element:<PostDetails/>
  },{
    path:'/author/:authorId',
    element:<Author/>
  },  {
    path:'/signin',
    element:<SignIn/>
  },{
    path:'/signup',
    element:<SignUp/>
  },{
    path:'/createblog',
    element:<CreateBlog/>
  },{
    path:'/editblog/:postId',
    element:<EditBlog/>
  },{
    path:'/editprofile/:authorId',
    element:<SignUp/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
