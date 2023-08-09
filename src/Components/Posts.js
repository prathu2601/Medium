import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'
import { useLocation } from 'react-router-dom'

function Posts() {

    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})
    
    const [posts, setPosts] = useState([])
    const [sear_val, setSear_val] = useState('')
    const [swit, setSwit] = useState(0)
    
    useEffect(()=>{

        if(user.id !== undefined){
            setSwit(1)
            fetch(`http://localhost:3001//blog_posts/recomendation/?user_id=${user.id}`, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                setPosts([...data])
            })
            .catch((error)=>console.log(error))
        }
        else {
            fetch("http://localhost:3001/")
            .then((response) => response.json())
            .then((data) => {
                setPosts([...data])
            });
        }
        
    },[])

    const search_info = (dat)=>{
        if(dat.topic === sear_val)
            return true
        if(dat.body.search(sear_val) !=-1)
            return true
        return false
    }

    const search_post = ()=>{

        fetch(`http://localhost:3001`)
        .then((response) => response.json())
        .then((data) => {
            var temp = []
            data.map((dat)=>{
                if(search_info(dat)){
                    temp.push(dat)
                }
            })            
            setPosts(temp)
        })
        .catch((error)=>console.log(error))

        setSwit(0)
        setSear_val('')
    }

    const view_all = ()=>{
        fetch("http://localhost:3001/")
        .then((response) => response.json())
        .then((data) => {
            setPosts([...data])
        });
        setSwit(0)
    }

    return (
        <div className='Posts_main'>
            <div className='Posts_section'>
                <div className='Search_Filter'>
                    <div className='Search'>
                        <input value={sear_val} onChange={(e)=>setSear_val(e.target.value)} type='text' placeholder='Search here'/>
                        <button onClick={search_post}>Search</button>
                    </div>
                </div>
                <div style={{marginLeft:'10px'}}>
                    {swit?
                        <h2>Recomendate Posts</h2>:
                        <h2>All Posts</h2>
                    }
                </div>
                <div className='Postlist_main'>
                    <div className='Postlist_sec'>    
                        {posts.map((post, index)=>{
                            return (
                                <div key={post.id} className='Post_list'>
                                    <Post post={post} index={index}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='Switch_id'>
                    {swit?<button onClick={view_all}>View All Posts</button>:<></>}
                </div>
            </div>
        </div>
    )
}

export default Posts