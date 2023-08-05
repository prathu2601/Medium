import React, { useEffect, useState } from 'react'
import './Comment.css'
import { useNavigate } from 'react-router-dom'
import del_img from '../Images/delete.png'

function Comment({comment, det_comm, user}) {

    const [new_user, setNew_user] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:3001/user/${comment.user_id}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setNew_user(...data)
        })
        .catch((error)=>console.log(error))
    },[])

  return (
    <div  className='Comments_sec'>
        <div className='comment_img'>
            <span onClick={()=>navigate(`/author/${new_user.id}`, {state:new_user})}>
                    {new_user.profilepicture!==null?<img src={`${new_user.profilepicture}`}></img>:<></>}
                    {`${new_user.firstname} ${new_user.lastname}`}
            </span>
            {user.id !== undefined && user.id === comment.user_id?<button onClick={()=>det_comm(comment.id)}><img src={del_img} alt=''/></button>:<></>}
        </div>
        <p>
            {comment.body}
        </p>
    </div>
  )
}

export default Comment