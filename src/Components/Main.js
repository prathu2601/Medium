import React from 'react'
import './Main.css'
import Posts from './Posts'
import Navbar from './Navbar'

function Main() {
  return (
    <div className='Main'>
        <Navbar/>
        <div className='Posts'>
            <Posts/>
        </div>
    </div>
  )
}

export default Main