import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const sigin = useLocation().pathname
    
    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

    // console.log(user)
    // useEffect(()=>{
    //     if(localStorage.getItem('user_info')){
    //         setUser(localStorage.getItem('user_info'))
    //     }
    //     // console.log(localStorage.getItem('user_info'))
    // },[user])
    
  return (
    <div style={{backgroundColor:"#FFC017"}}>
        <div className='Navbar_main'>
            <div className='Navbar'>
                <div className='Home_page'>
                    <h2 onClick={()=>navigate('/')}>
                        Medium 
                    </h2>
                </div>
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