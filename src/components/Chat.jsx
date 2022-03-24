import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChatInput from './ChatInput'
import Messages from './Messages'

export default function Chat () {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io('http://localhost:3004')
    setSocket(socketInstance)
  }, [])

  return (
		<div className=' absolute left-0 w-full bottom-0   h-12 text-xs rounded-b bg-slate-900/[.50]'>
			<div className='relative w-full'>
				{socket && (
					<div className='grid grid-rows-3'>
						<div className='row-span-2'>
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
