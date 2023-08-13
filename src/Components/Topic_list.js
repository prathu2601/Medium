import React from 'react'
import './Topic_list.css'
import Topic_card from './Topic_card'

const topics = [
    {id: 1, topicname: "programming"},
    {id: 2, topicname: "travel"},
    {id: 3, topicname: "politics"},
    {id: 4, topicname: "art"},
    {id: 5, topicname: "culture"},
    {id: 6, topicname: "life"},
    {id: 7, topicname: "work"},
    {id: 8, topicname: "society"},
    {id: 9, topicname: "education"},
    {id: 10, topicname: "gaming"}
]

function Topic_list({setNum_topic}) {
  return (
    <div className='Topic_main'>
        {topics.map((topic)=>{
            return <Topic_card topic={topic} key={topic.id} setNum_topic={setNum_topic}/>
        })}
    </div>
  )
}

export default Topic_list