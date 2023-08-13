import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import PostDetail from './PostDetail'
import Subscription from './Subscription'

function PostDetails() {

  const {postId} = useParams()

  const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

  const [post, setPost] = useState({})
  const [status, setStatus] = useState(2)
  
  useEffect(()=>{
    if(user.id !== undefined){

        fetch(`http://localhost:3001/blog_posts/?blog_post_id=${postId}&user_id=${user.id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
        //   console.log(data)
          setPost(data.result)
          setStatus(data.status)
        })
        .catch((error)=>console.log(error))
        
    }
  }, [])

  return (
    <div style={{display:"grid", marginBottom:"150px"}}>
        <Navbar/>
        {status === 2?
        <></>:
        status===1?
        <PostDetail post={post}/>:
        <Subscription/>
        }
    </div>
  )
}

export default PostDetails