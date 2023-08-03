import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        var po_arr = []
        po_arr.push({id:1, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        po_arr.push({id:2, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        po_arr.push({id:3, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        po_arr.push({id:4, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        po_arr.push({id:5, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        po_arr.push({id:0, title:"Title", topic:"Topic", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1igLFeuNAs15WL40Qr9CiGw-IUS4wy5quXg&usqp=CAU", text:"dnjkasndkjasjn ndajsn   as asd kds  dks", date_publish:new Date().getTime().toString(), author:"author"})
        setPosts(po_arr)
    },[])

    return (
        <div className='Posts_main'>
            <div className='Posts_section'>
                <div className=''>
                    <h2>Trending</h2>
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
            </div>
        </div>
    )
}

export default Posts