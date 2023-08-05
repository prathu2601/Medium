import React, { useEffect, useState } from 'react'
import './Author.css'
import Navbar from './Navbar'
import Author_post from './Author_post'
import { useLocation, useNavigate } from 'react-router-dom'

function Author() {

  const author = useLocation().state
  const navigate = useNavigate()

  const dummp = localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{}
  const [followed, setFollowed] = useState(0)


  const [user, setUser] = useState(
    author !== null?
    author:
    localStorage.getItem('user_info')?
    JSON.parse(localStorage.getItem('user_info')):
    {})

  const [postss, setPosts] = useState([])

    useEffect(()=>{

      if(dummp.id !== undefined){
        fetch(`http://localhost:3001/is_followed/?user1_id=${dummp.id}&user2_id=${user.id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setFollowed(data)
        })
        .catch((error)=>console.log(error))
      }

    },[])

  useEffect(()=>{
    let user_in = localStorage.getItem('user_info')?
    JSON.parse(localStorage.getItem('user_info')):
    {}
    if(author !== null)
      user_in = author
    fetch(`http://localhost:3001/blog_posts/user/${user_in.id}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setPosts([...data])
    })
    .catch((error)=>console.log(error))
  },[author])

  useEffect(()=>{
    setUser(author !== null?
      author:
      localStorage.getItem('user_info')?
      JSON.parse(localStorage.getItem('user_info')):
      {})
  },[author])

  const toggle_follow = ()=>{
    fetch(`http://localhost:3001/toggle_follow/?user1_id=${dummp.id}&user2_id=${user.id}`, {
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
            <img src={`${user.profilepicture}`} alt=''/>
          </div>
          <div className='Author_name'>
            <h1>
              <span>
                {user.firstname} {user.lastname}
              </span>
              {dummp.id !== undefined && dummp.id !== user.id ?followed?
                <button onClick={toggle_follow}>Unfollow</button>:  
                <button onClick={toggle_follow}>Follow</button>
              :<></>}
              {dummp.id !== undefined && dummp.id === user.id ?
                <button onClick={()=>navigate(`/editprofile/${dummp.id}`)}>Edit Profile</button>:
                <></>
              }
            </h1>
            <span>{user.bio} </span>
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