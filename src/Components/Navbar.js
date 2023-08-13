import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import menu_img from '../Images/menu.png'
import cross_img from '../Images/cross.png'

function Navbar() {
    const navigate = useNavigate()

    const sigin = useLocation().pathname
    
    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

    const [show, setShow] = useState(0)

    const onoff = ()=>{
        setShow(1-show)
    }

    return (
        <div style={{backgroundColor:"#FFC017"}}>
            <div className='Navbar_main'>
                <div className='Navbar'>
                    <div className='Home_page'>
                        <div className='Menu_button'>
                            {show===0?
                                <button onClick={onoff}>
                                    <img src={menu_img} alt=''/>
                                </button>:
                                <button onClick={onoff}>
                                    <img src={cross_img} alt=''/>
                                </button>
                            }
                        </div>
                        <h2 onClick={()=>{setShow(0)
                            navigate('/')
                            window.location.reload()}}>
                            Medium 
                        </h2>
                    </div>
                    {/* <div className='All_but'>
                        {(sigin !== '/createblog' && user.id !== undefined)?
                            <button onClick={()=>navigate('/createblog')}>
                                Create Blog
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signup' && user.id === undefined)?
                            <button onClick={()=>navigate('/signup')}>
                                Sign up
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signin' && user.id === undefined)?
                            <button onClick={()=>navigate('/signin')}>
                                Sign In
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{navigate(`/author/${user.id}`)}}>
                                <img src={`${user.profilepicture}`} alt=''/>
                                <span>{user.firstname}</span>
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{
                                fetch(`http://localhost:3001/user/signout`, {
                                    method: 'DELETE',
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    // console.log(data)
                                })
                                .catch((error)=>console.log(error))
                                localStorage.removeItem('user_info')
                                setUser({})
                                navigate('/')
                                window.location.reload()
                            }}>
                                Sign Out
                            </button>:
                            <></>
                        }
                    </div> */}
                    {show===1?<div className='All_but'>
                        {(sigin !== '/createblog' && user.id !== undefined)?
                            <button onClick={()=>{setShow(0) 
                                navigate('/createblog')}}>
                                Create Blog
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signup' && user.id === undefined)?
                            <button onClick={()=>{setShow(0)
                                navigate('/signup')}}>
                                Sign up
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signin' && user.id === undefined)?
                            <button onClick={()=>{setShow(0) 
                                navigate('/signin')}}>
                                Sign In
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{setShow(0)
                                navigate(`/author/${user.id}`)}}>
                                <img src={`${user.profilepicture}`} alt=''/>
                                <span>{user.firstname}</span>
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{
                                fetch(`http://localhost:3001/user/signout`, {
                                    method: 'DELETE',
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    // console.log(data)
                                })
                                .catch((error)=>console.log(error))
                                localStorage.removeItem('user_info')
                                setUser({})
                                setShow(0)
                                navigate('/')
                                window.location.reload()
                            }}>
                                Sign Out
                            </button>:
                            <></>
                        }
                    </div>:<></>}
                    <div className='All_button'>
                        {(sigin !== '/createblog' && user.id !== undefined)?
                            <button onClick={()=>navigate('/createblog')}>
                                Create Blog
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signup' && user.id === undefined)?
                            <button onClick={()=>navigate('/signup')}>
                                Sign up
                            </button>:
                            <></>
                        }
                        {(sigin !== '/signin' && user.id === undefined)?
                            <button onClick={()=>navigate('/signin')}>
                                Sign In
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{navigate(`/author/${user.id}`)}}>
                                <img src={`${user.profilepicture}`} alt=''/>
                                <span>{user.firstname}</span>
                            </button>:
                            <></>
                        }
                        {user.id !== undefined?
                            <button onClick={()=>{
                                fetch(`http://localhost:3001/user/signout`, {
                                    method: 'DELETE',
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    // console.log(data)
                                })
                                .catch((error)=>console.log(error))
                                localStorage.removeItem('user_info')
                                setUser({})
                                navigate('/')
                                window.location.reload()
                            }}>
                                Sign Out
                            </button>:
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar