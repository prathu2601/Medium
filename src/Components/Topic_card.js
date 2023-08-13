import React, { useEffect, useState } from 'react'
import './Topic_card.css'

function Topic_card({topic, setNum_topic}) {

    const [user, setUser] = useState(localStorage.getItem('user_info')?JSON.parse(localStorage.getItem('user_info')):{})

    const [but_set, setBut_set] = useState(0)

    useEffect(()=>{

        fetch(`http://localhost:3001/follow_topic/is/?topic_id=${topic.id}&user_id=${user.id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setBut_set(data.result)
        })
        .catch((error)=>console.log(error))

    },[])

    const button_color_change = ()=>{
        
        fetch(`http://localhost:3001/follow_topic/toggle/?topic_id=${topic.id}&user_id=${user.id}`, {
          method: 'POST',
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
        })
        .catch((error)=>console.log(error))

        setBut_set(1-but_set)
        setNum_topic(Math.ceil(Math.random()*100))

    }

  return (
    <div className='Topic_card_main'>
        <button className={`button_com ${but_set && 'button_change'}`} onClick={button_color_change}>
            {topic.topicname}
        </button>
    </div>
  )
}

export default Topic_card