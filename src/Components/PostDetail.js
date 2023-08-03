import React, { useState } from 'react'
import './PostDetail.css'
import { Link, useLocation } from 'react-router-dom'

function PostDetail() {
  const post = useLocation().state.post
  console.log(post)

  const [likes, setLikes] = useState(10)
  const [comments, setComments] = useState(5)
  const [views, setViews] = useState(0)

  return (
    <div className='PostDetail_main'>
      <div className='Post_title'>
        <h1>{post.title}</h1>
      </div>
      <div className='Post_author'>
          <div>
            <img src={post.img} alt=''></img>
          </div>
          <div>
            <Link to={`/author/:id`}>
              <span>
                {post.author}
              </span>
            </Link>
            <button>Follow</button>
            <div className='publish_date'>
              {new Date(parseInt(post.date_publish)).toDateString()}
            </div>
          </div>
      </div>
      <div className='Like_Comment'>
        <button>
          <img src={`${post.img}`} alt=''/>
        </button>
        {likes}
        <button>
          <img src={`${post.img}`} alt=''/>
        </button>
        {comments}
        <span>{views} views</span>
      </div>
      <div className='Post_text'>
        {post.text}
      </div>
    </div>
  )
}

export default PostDetail