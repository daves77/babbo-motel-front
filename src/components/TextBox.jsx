import React, { useEffect, useState } from 'react'

import KeyPressListener from '../game/KeypressListener'
import utils from '../utils'

export default function TextBox () {
  const [message, setMessage] = useState('')

  const closeTextMessage = () => {
    utils.emitEvent('TextMessageDone')
    setMessage('')
  }

  useEffect(() => {
    document.addEventListener('TextMessage', (e) => {
      const actionListener = new KeyPressListener('Enter', () => {
        actionListener.unbind()
        closeTextMessage()
      })
      setMessage(e.detail.text)
    })
  }, [])

  if (message) {
    return (
			<div className='p-4 absolute left-0 w-full bottom-0 h-9 text-xs rounded-b bg-darkblue/[0.8]'>
				<div className='absolute w-full top-0 left-0 p-1 px-2'>
          <div className="flex justify-between">
					<p className='text-white'>{message}</p>
					<button type='button' className="justify-self-end text-white" onClick={closeTextMessage}>
						Next
					</button>
          </div>
				</div>
			</div>
    )
  }

  return null
}
