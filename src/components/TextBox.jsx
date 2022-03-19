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
			<div className='p-4 absolute left-0 w-full bottom-0 h-9 text-xs  bg-slate-500'>
				<div className='absolute w-full top-0 left-0 p-1 px-2'>
          <div className="flex justify-between">
					<p className=''>{message}</p>
					<button type='button' className="justify-self-end" onClick={closeTextMessage}>
						next
					</button>
          </div>
				</div>
			</div>
    )
  }

  return null
}
