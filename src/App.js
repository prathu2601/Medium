import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './Components/Main';
import PostDetail from './Components/PostDetail';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Author from './Components/Author';
import CreateBlog from './Components/CreateBlog';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main/>
  },{
    path:'/post/:id',
    element:<PostDetail/>
  },{
    path:'/author/:id',
    element:<Author/>
  },  {
    path:'/signin',
    element:<SignIn/>
  },{
    path:'/signup',
    element:<SignUp/>
  },{
    path:'/createblog/',
    element:<CreateBlog/>
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
