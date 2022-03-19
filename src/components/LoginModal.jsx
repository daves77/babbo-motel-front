import React, { useEffect, useState } from 'react'

import SignupForm from '../sections/SignupForm'
import LoginForm from '../sections/LoginForm'

import Tabs from './Tabs'

const tabs = [
  { name: 'Sign Up', current: true },
  { name: 'Login', current: false }
]

export default function LoginModal () {
  const [isOpen, setIsOpen] = useState(false)
  const [currentState, setCurrentState] = useState(tabs[0].name)

  useEffect(() => {
    document.addEventListener('SignUp', () => {
      setIsOpen(true)
    })
  })

  return (
    <>
    {isOpen &&
      <div className="min-h-full relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Tabs tabs={tabs} currentState={currentState} setCurrentState={setCurrentState}/>
            {currentState === 'Sign Up'
              ? (
          <SignupForm setCurrentState={setCurrentState} />
                )
              : (
                <LoginForm />
                ) }

          </div>
        </div>
      </div>
    }
    </>
  )
}
