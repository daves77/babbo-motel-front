import React, { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { Context } from '../store'

export default function ChatInput ({ socket }) {
  const { register, handleSubmit, reset } = useForm()
  const { store } = useContext(Context)
  const user = store.user

  const onSubmit = (data) => {
    socket.emit('chatMessage', {
      username: user.username,
      head: user.sprite.head,
      message: data.message
    })
    reset({ message: '' })
  }
  return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex '>
				<input
					className='w-full bg-darkblue/[0.6] rounded-bl  text-white focus:outline-none pl-1'
					type='text'
					name='message'
					{...register('message')}
				/>
				<button type='submit' className="px-2 bg-indigo-300/[0.8] rounded-br ">Send</button>
			</div>
		</form>
  )
}
