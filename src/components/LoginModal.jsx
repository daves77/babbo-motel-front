import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import SignupForm from '../sections/SignupForm'
import LoginForm from '../sections/LoginForm'
import CharacterCustomisation from './CharacterCusomisation'

import { Context, loadUserAction } from '../store'

import Tabs from './Tabs'

const tabs = [
  { name: 'Sign Up', current: true },
  { name: 'Login', current: false }
]

export default function LoginModal () {
  const navigate = useNavigate()
  const { dispatch } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentState, setCurrentState] = useState(tabs[0].name)

  useEffect(() => {
    document.addEventListener('SignUp', () => {
      setIsOpen(true)
    })
  })

  const onSubmit = async (data) => {
    const endpoint =
			currentState === 'Sign Up'
			  ? `${process.env.REACT_APP_BACKEND_URL}/api/user/signup/`
			  : `${process.env.REACT_APP_BACKEND_URL}/api/user/login/`
    try {
      setIsLoading(true)
      setError(null)
      const { email, password } = data
      console.log(endpoint)
      const tokenRes = await axios.post(endpoint, { email, password })
      localStorage.setItem('token', `Bearer ${tokenRes.data.token}`)
      const userRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/info/`, { headers: { Authorization: `${localStorage.getItem('token')}` } })
      console.log(userRes.data)
      await dispatch(loadUserAction(userRes.data))
      setIsLoading(false)
      if (userRes.data.sprite) {
        navigate('/game', { replace: true })
      } else {
        setCurrentState('Sprite')
      }
    } catch (err) {
      console.log(err.response)
      setIsLoading(false)
      setError(err.response.data.error)
    }
  }

  return (
		<>
			{isOpen && (
				<div className='min-h-full relative flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          {currentState !== 'Sprite'
            ? (
            	<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-darkblue py-8 px-4 shadow sm:rounded-lg sm:px-10'>
							<Tabs
								tabs={tabs}
								currentState={currentState}
								setCurrentState={setCurrentState}
							/>
							{currentState === 'Sign Up'
							  ? (
								<SignupForm
									setCurrentState={setCurrentState}
									onSubmit={onSubmit}
									isLoading={isLoading}
								/>
							    )
							  : (
								<LoginForm onSubmit={onSubmit} isLoading={isLoading} />
							    )}
                  {error && (
                    <div className="mt-2 text-red-500">
                      {error}
                    </div>
                  )}
						</div>
					</div>
              )
            : (
            <CharacterCustomisation />
              )}
				</div>
			)}
		</>
  )
}
