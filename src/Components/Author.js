import React, { useEffect, useState } from 'react'
import './Author.css'
import Navbar from './Navbar'
import Author_post from './Author_post'
import { useNavigate, useParams } from 'react-router-dom'

function Author() {

  const navigate = useNavigate()

  const { authorId } = useParams()
  const [author, setAuthor] = useState({})
  // console.log(author)

  const [followed, setFollowed] = useState(0)
  const [following, setFollowing] = useState({})

  const [user, setUser] = useState(
    localStorage.getItem('user_info')?
    JSON.parse(localStorage.getItem('user_info')):
    {})
    // console.log(user)

  const [postss, setPosts] = useState([])

  useEffect(()=>{

    fetch(`http://localhost:3001/follow/all/${authorId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      setFollowing(data.result[0])
    })
    .catch((error)=>console.log(error))
    

    fetch(`http://localhost:3001/user/${authorId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.result[0])
      setAuthor(data.result[0])
    })
    .catch((error)=>console.log(error))

  }, [authorId])

  useEffect(()=>{

    if(user.id !== undefined && user.id !== parseInt(authorId)){
      fetch(`http://localhost:3001/follow/is/?user1_id=${user.id}&user2_id=${authorId}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setFollowed(data.result)
      })
      .catch((error)=>console.log(error))
    }

  },[authorId])

  useEffect(()=>{

    fetch(`http://localhost:3001/blog_posts/user/${authorId}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setPosts([...data.result])
      // console.log(data)
    })
    .catch((error)=>console.log(error))

  },[authorId])

  const toggle_follow = ()=>{
    fetch(`http://localhost:3001/follow/toggle/?user1_id=${user.id}&user2_id=${authorId}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
    })
    .catch((error)=>console.log(error))

    setFollowed(!followed)
  }

  return (
    <div className='Author_main'>
      <Navbar/>
      <div className='Author_sec'>
        <div className='Author_info'>
          <div>
            <img src={`${author.profilepicture}`} alt=''/>
          </div>
          <div className='Author_name'>
            <h1>
              <span>
                {author.firstname} {author.lastname}
              </span>
              {user.id !== undefined && user.id !== author.id ?followed?
                <button onClick={toggle_follow}>Unfollow</button>:  
                <button onClick={toggle_follow}>Follow</button>
              :<></>}
              {user.id !== undefined && user.id === author.id ?
                <button onClick={()=>navigate(`/editprofile/${user.id}`)}>Edit Profile</button>:
                <></>
              }
            </h1>
            <span>{author.bio} </span>
          </div>
        </div>
        <div className='Author_posts'>
          {postss.map((pos)=>{
            return (
              <div key={pos.id}>
                <Author_post pos={pos}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Author