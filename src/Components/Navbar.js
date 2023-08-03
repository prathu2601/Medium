import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{backgroundColor:"#FFC017"}}>
        <div className='Main_section'>
            <div className='Navbar'>
                <h2> Medium </h2>
                <div className='SignUp_button'>
                    <Link to={'./createblog'}>
                        <button>CreateBlog</button>
                    </Link>
                </div>
                <div className='SignUp_button'>
                    <Link to={'./signup'}>
                        <button>Sign up</button>
                    </Link>
                </div>
                <div className='SignIn_button'>
                    <Link to={'./signin'}>
                        <button>Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar