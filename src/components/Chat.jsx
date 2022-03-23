import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Chat () {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([{ message: 'test' }])
  useEffect(() => {
    console.log('called')
    const socketInstance = io('http://localhost:3004')

    socketInstance.on('chatMessage', message => {
      // have a question regarding state here
      // const updated = [message, ...messages]
      setMessages(prevMessages => [...prevMessages, message])
    })

    setSocket(socketInstance)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    socket.emit('chatMessage', { message: e.target.message.value })
  }

  return (
    <div>
      {messages.map((messageObj, idx) => (
        <div key={idx}>{messageObj.message}</div>
      ))}
      <form onSubmit={onSubmit}>
      <input type="text" name="message" />
      <button type="submit">send</button>
      </form>
    </div>
  )
}
