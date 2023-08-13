import React, { useEffect, useState } from 'react'
import './Author_post.css'
import { useNavigate } from 'react-router-dom'

function Author_post({pos}) {
  
  const navigate = useNavigate()
  const [readtime, setReadtime] = useState(0)
  // console.log(pos)

  useEffect(()=>{
    fetch(`http://localhost:3001/blog_posts/readingtime/${pos.id}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        setReadtime(data.result)
    })
    .catch((error)=>console.log(error))
  },[])

  return (
    <div className='Author_post_main'>
      <div className='Author_title'>
        <span onClick={()=>navigate(`/post/${pos.id}`)}>
          {pos.title}
        </span>
      </div>
      <div className='Post_topic'>
        {pos.topic}
      </div>
      <div className='Date_publish'>
          {/* {new Date((pos.updated_at)).toDateString()} */}
          <span>
              {`${new Date((pos.updated_at)).toDateString()}`}               
          </span>
          <span style={{marginRight:'5px'}}>
              {`${readtime} minutes read`}
          </span>
      </div>
    </div>
  )
}

export default Author_post