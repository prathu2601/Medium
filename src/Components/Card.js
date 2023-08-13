import React, { useState } from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

function Card({price}) {

  const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

  const navigate = useNavigate()

  const buysubscription = (price)=>{
      
    window.location.replace(`http://localhost:3001/checkout/?user_id=${user.id}&product=${price}`)
    //   fetch(`http://localhost:3001/checkout/?user_id=${user.id}&product=${price}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //       // console.log(data)
    //       // navigate('/')
    //   })
    //   .catch((error)=>console.log(error))

  }

  return (
    <div className='Card_main'>
        <div className='Card_sec'>
            <h2>
                {price === 3?"Gold": price === 5?"Platinum":"Diamond"}
            </h2>
            <span>
                {price} ₹
            </span>
            <div>
                <p>{price} More posts to view</p>
            </div>
            <button onClick={()=>buysubscription(price)}>
                Buy
            </button>
        </div>
    </div>
  )
}

export default Card