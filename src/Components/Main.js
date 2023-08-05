import React from 'react'
import './Main.css'
import Posts from './Posts'
import Navbar from './Navbar'

function Main() {
  return (
    <div className='Main'>
        <Navbar signin={1} signup={1} createblog={1}/>
        <div className='Posts'>
            <Posts/>
        </div>
    </div>
  )
}

export default Main