import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'
import Topic_list from './Topic_list'

function Posts() {

    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})
    
    const [posts, setPosts] = useState([])
    const [sear_val, setSear_val] = useState('')
    const [swit, setSwit] = useState(0)

    const [aut_fil, setAut_fil] = useState('')
    const [minl, setMinl] = useState('')
    const [minc, setMinc] = useState('')
    const [maxl, setMaxl] = useState('')
    const [maxc, setMaxc] = useState('')

    const [num_topic, setNum_topic] = useState(0)

    const [show_filter, setShow_filter] = useState(0)
    
    useEffect(()=>{

        if(user.id !== undefined){
            setSwit(1)
            fetch(`http://localhost:3001//blog_posts/recomendation/?user_id=${user.id}`, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                setPosts([...data.result])
            })
            .catch((error)=>console.log(error))
        }
        else {
            fetch("http://localhost:3001/")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setPosts([...data.result])
            });
        }
        
    },[num_topic])

    const search_post = ()=>{

        fetch(`http://localhost:3001/blog_posts/search/?searchParameter=${sear_val}`,{
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.result)
            setPosts([...data.result])
        })
        .catch((error)=>console.log(error))

        setSwit(0)
        setSear_val('')
        
    }

    const filter_res = ()=>{

        fetch(`http://localhost:3001/blog_posts/filter/?author=${aut_fil}&minlikes=${minl}&maxLikes=${maxl}&minComments=${minc}&maxComments=${maxc}`,{
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.result)
            setPosts([...data.result])
        })
        .catch((error)=>console.log(error))

        setSwit(0)
        setAut_fil('')
        setMaxl('')
        setMinl('')
        setMinc('')
        setMaxc('')
    }

    const view_all = ()=>{
        fetch("http://localhost:3001/")
        .then((response) => response.json())
        .then((data) => {
            setPosts([...data.result])
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
                        <button onClick={()=>setShow_filter(1-show_filter)}>
                            {!show_filter?"Show filters":"Hide filters"}
                        </button>
                    </div>
                    {show_filter?<div className='Filters'>
                        <div className='Filter_author'>
                            <input type='text' value={aut_fil} placeholder='author' onChange={(e)=>setAut_fil(e.target.value)}/>
                        </div>
                        <div className='Filter_likes'>
                            <input value={minl} placeholder='min likes' onChange={(e)=>setMinl(e.target.value)} type='number'/>
                            <input value={maxl} placeholder='max likes' onChange={(e)=>setMaxl(e.target.value)} type='number'/>
                        </div>
                        <div className='Filter_comments'>
                            <input value={minc} placeholder='max comments' onChange={(e)=>setMinc(e.target.value)} type='number'/>
                            <input value={maxc} placeholder='max comments' onChange={(e)=>setMaxc(e.target.value)} type='number'/>
                        </div>
                        <button onClick={filter_res}>Apply Filter</button>
                    </div>:<></>}
                </div>
                {user.id !== undefined?<Topic_list setNum_topic={setNum_topic}/>:<></>}
                <div style={{marginLeft:'10px'}}>
                    {swit?
                        <h2>Recomendate Posts</h2>:
                        <h2>All Posts</h2>
                    }
                </div>
                <div className='Postlist_main'>
                    <div className='Postlist_sec'>    
                        {posts.length === 0 && swit === 1?<span>Follow some topics for posts to be recomendate</span>:<></>}
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