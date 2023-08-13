import React, { useEffect, useState } from 'react'
import './PostDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
import Like_img from '../Images/Like.png'
import Dislike_img from '../Images/Dislike.png'
import Comment_img from '../Images/Comment.png'
import Comment from './Comment'

function PostDetail({post}) {
  
  const navigate = useNavigate();
  
  const {postId} = useParams()

  const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})
  const [author, setAuthor] = useState({})
  // console.log(author)
  
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [showcom, setShowcom] = useState(false)
  const [com_val, setCom_val] = useState('')
  const [followed, setFollowed] = useState(0)
  const [readtime, setReadtime] = useState(0)

  useEffect(()=>{
    if(user.id !== undefined){
      fetch(`http://localhost:3001/like/is/?user_id=${user.id}&blog_post_id=${postId}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setLiked(data.result)
      })
      .catch((error)=>console.log(error))
      
      fetch(`http://localhost:3001/follow/is/?user1_id=${user.id}&user2_id=${post.user_id}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setFollowed(data.result)
      })
      .catch((error)=>console.log(error))
    }
    
    fetch(`http://localhost:3001/user/${post.user_id}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setAuthor(data.result[0])
    })
    .catch((error)=>console.log(error))

    fetch(`http://localhost:3001/like/all/?blog_post_id=${postId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setLikes(data.result.length)
    })
    .catch((error)=>console.log(error))

    fetch(`http://localhost:3001/comment/all/?blog_post_id=${postId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setComments([...data.result])
    })
    .catch((error)=>console.log(error))

    fetch(`http://localhost:3001/blog_posts/readingtime/${postId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        setReadtime(data.result)
    })
    .catch((error)=>console.log(error))

  },[])

  const toggle_follow = ()=>{
    fetch(`http://localhost:3001/follow/toggle/?user1_id=${user.id}&user2_id=${post.user_id}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
    })
    .catch((error)=>console.log(error))

    setFollowed(!followed)
  }

  const like_dislike = ()=>{
    if(user.id === undefined) alert("Sign In First")
    else{
      fetch(`http://localhost:3001/like/toggle/?user_id=${user.id}&blog_post_id=${post.id}`, {
        method: 'POST',
      })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((error)=>console.log(error))
  
      setLiked(!liked)
      setLikes(liked?likes-1:likes+1)
    }
  }

  const delete_post = ()=>{

    fetch(`http://localhost:3001/blog_posts/destroy/${post.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => navigate('/'))
    .catch(error => console.error(error));

    navigate('/')

  }

  const comment_on = ()=>{
    setShowcom(!showcom)
  }

  const addcomment = ()=>{

    fetch(`http://localhost:3001/comment/create/?blog_post_id=${post.id}&user_id=${user.id}&body=${com_val}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
    })
    .catch((error)=>console.log(error))

    setComments([...comments, {blog_post_id:post.id, body:com_val, id:new Date().toDateString(), user_id:user.id}])
    setCom_val('')
    
  }
  
  const det_comm = (ide)=>{
    
    fetch(`http://localhost:3001/comment/destroy/?comment_id=${ide}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
    })
    .catch((error)=>console.log(error))
    
    setComments(comments.filter((comment)=>{
      return comment.id !== ide
    }))

  }

  return (
    <div className='PostDetail_sec'>
      <div className='Post_title'>
        <h1>{post.title}</h1>
      </div>
      <div className='Post_author'>
          <div>
            {author.profilepicture!==null?<img src={author.profilepicture} alt=''></img>:<></>}
          </div>
          <div>
            <span onClick={()=>navigate(`/author/${author.id}`)}>
              {`${author.firstname} ${author.lastname}`}
            </span>
            {user.id !== undefined && user.id !== post.user_id ?followed?
              <button onClick={toggle_follow}>Unfollow</button>:  
              <button onClick={toggle_follow}>Follow</button>
            :<></>}
            <div className='publish_date'>
                <span>
                    {`${new Date((post.updated_at)).toDateString()}`}               
                </span>
                <span style={{marginRight:'5px'}}>
                    {`${readtime} minutes read`}
                </span>
            </div>
          </div>
      </div>
      <div className='Like_Comment'>
        <button onClick={like_dislike}>
          <img src={liked?Dislike_img:Like_img} alt=''/>
        </button>
        {likes}
        <button onClick={comment_on}>
          <img src={Comment_img} alt=''/>
        </button>
        {comments.length}
        <span>{post.views} views</span>
      </div>
      <div className='Post_text'>
        <div className='Post_text_img'>
          {post.imgurl !== undefined && post.imgurl.length > 0?
            <img src={`${post.imgurl}`} alt=''/>:
            <></>
          }
        </div>
        <p>{post.body}</p>
      </div>
      {(user.id !== undefined && user.id === author.id)?<div className='Edit_delete_post'>
        <button onClick={()=>navigate(`/editblog/${post.id}`, {state:post} )}>Edit</button>
        <button onClick={delete_post}>Delete</button>
      </div>:<></>}
      {showcom?<div className='Comments_main'>
        <h2>Comments</h2>
        {user.id !== undefined?<div className='Add_comment'>
          <input value={com_val} placeholder='What are your thoughts?' onChange={(e)=>setCom_val(e.target.value)}/>
          <button onClick={addcomment}>Comment</button>
        </div>:<></>}
        {comments.map((comment)=>{
          // console.log(comment)
          return (
            <div key={comment.id}>
              <Comment comment={comment} det_comm={det_comm} user={user}/>
            </div>
          )
        })}
      </div>:<></>}
    </div>
  )
}

export default PostDetail