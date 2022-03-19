import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ErrorMessage from '../components/ErrorMessage'

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email!')
    .required('Please enter an email'),
  password: yup.string().required('Please enter a password!')
})

export default function LoginForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => {
    console.log(data.email)
    console.log(data.password)
  }
  console.log(errors)

  return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-6 pt-4'
			action='#'
			method='POST'>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700'>
					Email address
				</label>
				<div className='mt-1'>
					<input
						{...register('email')}
						id='email'
						name='email'
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<ErrorMessage errors={errors} input='email' />
			</div>

			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						{...register('password')}
						id='password'
						name='password'
						type='password'
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<ErrorMessage errors={errors} input='password' />
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<input
						id='remember-me'
						name='remember-me'
						type='checkbox'
						className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
					/>
					<label
						htmlFor='remember-me'
						className='ml-2 block text-sm text-gray-900'>
						Remember me
					</label>
				</div>

				<div className='text-sm'>
					<a
						href='#'
						className='font-medium text-indigo-600 hover:text-indigo-500'>
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					Login
				</button>
			</div>
		</form>
  )
}
