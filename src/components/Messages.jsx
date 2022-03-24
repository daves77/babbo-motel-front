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

  useEffect(() => {
    console.log('called')
    chatboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }, [messages])

  return (
		<div ref={chatboxRef} className='relative w-full  h-8'>
      <ScrollableFeed forceScroll={true}>
			{messages.map((messageObj, idx) => (
				<div key={idx}>
					{messageObj.username}: {messageObj.message}
				</div>
			))}
      </ScrollableFeed>
		</div>
  )
}
