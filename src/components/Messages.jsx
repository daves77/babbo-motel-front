import React, { useState, useEffect } from 'react'
import ScrollableFeed from 'react-scrollable-feed'

export default function Messages ({ socket }) {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    socket.on('chatMessage', (message) => {
      // have a question regarding state here
      // const updated = [message, ...messages]
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }, [])

  return (
		<div className='absolute w-full  h-8 p-1'>
      <ScrollableFeed forceScroll={true}>
			{messages.map((messageObj, idx) => (
				<div key={idx} className="text-white flex ">
          <div className="relative h-3 w-2 mr-1">
            <div className="absolute bottom-1">

          <img src={messageObj.head} className="" />
            </div>
          </div>
          <div>
					{messageObj.username}: {messageObj.message}
          </div>
				</div>
			))}
      </ScrollableFeed>
		</div>
  )
}
