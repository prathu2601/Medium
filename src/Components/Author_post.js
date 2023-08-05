import React from 'react'
import './Author_post.css'
import { Link, useNavigate } from 'react-router-dom'

function Author_post({pos}) {
  
  const navigate = useNavigate()
  // console.log(pos)

  return (
    <div className='Author_post_main'>
      <div className='Author_title'>
        <span onClick={()=>navigate(`/post/${pos.id}`,{state:pos})}>
          {pos.title}
        </span>
      </div>
      <div className='Post_topic'>
        {pos.topic}
      </div>
      <div className='Date_publish'>
          {new Date((pos.updated_at)).toDateString()}
      </div>
    </div>
  )
}

export default Author_post