import React, { useState } from 'react'
import './Subscription.css'
import Card from './Card'

function Subscription() {

  const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})


  return (
    <div className='Subscription_main'>
        <div className='Subscription_sec'>
            <h1>Subscriptions Plans</h1>
            <div className='Cards'>
                <Card price={3}/>
                <Card price={5}/>
                <Card price={10}/>
            </div>
        </div>
    </div>
  )
}

export default Subscription