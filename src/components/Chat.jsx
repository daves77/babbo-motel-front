import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChatInput from './ChatInput'
import Messages from './Messages'

export default function Chat () {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_BACKEND_URL)
    setSocket(socketInstance)
  }, [])

  return (
		<div className=' absolute left-0 w-full bottom-0  h-12 rounded-b bg-darkblue/[.60]'>
			<div className='relative w-full ' style={{ fontSize: '6.4px' }}>
				{socket && (
					<div className='grid grid-rows-5 '>
						<div className='row-span-4'>
							<Messages socket={socket} />
						</div>
						<div className='row-span-1'>
							<ChatInput socket={socket} />
						</div>
					</div>
				)}
			</div>
		</div>
  )
}
