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
      message: data.message
    })
    reset({ message: '' })
  }
  return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex '>
				<input
					className='w-full'
					type='text'
					name='message'
					{...register('message')}
				/>
				<button type='submit'>send</button>
			</div>
		</form>
  )
}
