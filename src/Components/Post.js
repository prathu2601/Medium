import React, { useState, useEffect } from 'react'
import './Post.css'
import { useNavigate } from 'react-router-dom'

function Post({post, index}) {

    const navigate = useNavigate()

    const [author, setAuthor] = useState({})

    const [readtime, setReadtime] = useState(0)

    useEffect(()=>{
        
        fetch(`http://localhost:3001/user/${post.user_id}`, {
        method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            setAuthor(data.result[0])
        })
        .catch((error)=>console.log(error))
        
        fetch(`http://localhost:3001/blog_posts/readingtime/${post.id}`, {
        method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setReadtime(data.result)
        })
        .catch((error)=>console.log(error))

    },[])


  return (
    <div className='Post_main'>
        <div className='Post_number'>
            <h2>0{index+1}</h2>
        </div>
        <div className='Post_brief'>
            <div className='Author'>
                <span onClick={()=>navigate(`/author/${author.id}`)}>
                    {author.profilepicture!==null?<img src={`${author.profilepicture}`}></img>:<></>}
                    {`${author.firstname} ${author.lastname}`}
                </span>
            </div>
            <div className='Title'>
                <span onClick={()=>navigate(`/post/${post.id}`,{state:post})}>
                    {post.title}
                </span>
            </div>
            <div className='Date_publish'>
                <span>
                    {`${new Date((post.updated_at)).toDateString()}`}               
                </span>
                <span style={{marginRight:'5px'}}>
                    {`${readtime} minutes read`}
                </span>
            </div>
        </div>
    </div>
  )
}

export default Post