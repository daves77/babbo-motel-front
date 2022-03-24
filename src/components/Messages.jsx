import React, { useState, useEffect, useRef } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
export default function Messages ({ socket }) {
  const [messages, setMessages] = useState([])
  const chatboxRef = useRef(null)

  useEffect(() => {
    socket.on('chatMessage', (message) => {
      // have a question regarding state here
      // const updated = [message, ...messages]
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }, [])

  return (
		<div ref={chatboxRef} className='absolute w-full  h-8 p-1'>
      <ScrollableFeed forceScroll={true}>
			{messages.map((messageObj, idx) => (
				<div key={idx} className="text-white">
					{messageObj.username}: {messageObj.message}
				</div>
			))}
      </ScrollableFeed>
		</div>
  )
}
