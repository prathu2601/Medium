import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

function Post({post, index}) {
  return (
    <div className='Post_main'>
        <div className='Post_number'>
            <h2>0{index+1}</h2>
        </div>
        <div className='Post_brief'>
            <div className='Author'>
                <Link to={`/author/${post.id}`}>
                    <img src={`${post.img}`}></img>
                    <span>{post.author}</span>
                </Link>
            </div>
            <div className='Title'>
                <Link to={`./post/${post.id}`} state={{post}}>
                    <span>{post.title}</span>
                </Link>
            </div>
            <div className='Date_publish'>
                {new Date(parseInt(post.date_publish)).toDateString()}
            </div>
        </div>
    </div>
  )
}

export default Post