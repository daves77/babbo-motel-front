import _ from 'lodash'
import React, { useContext } from 'react'
import { CogIcon } from '@heroicons/react/outline'

import { Context, toggleModal } from '../store'

export default function GameMenu () {
  const { store, dispatch } = useContext(Context)
  const user = store.user

  const onToggle = () => {
    console.log('clicking')
    dispatch(toggleModal(!store.modalOpen))
  }

  return (
    <>
    {
      !_.isEmpty(user) && user.sprite && (
 <div className="absolute h-4 w-16 bg-blue/[0.95] rounded-xl right-0 left-0 mx-auto mt-1">
      <div className="flex justify-between items-center w-full h-full">
        <div className="h-3 w-2 relative ml-1 mb-1">
          <img src={user.sprite.head} />
          <div className="bg-green-500 animate-ping rounded-full absolute " style={{ height: '3px', width: '3px', left: '7px', top: '11px' }} />
        </div>
        <div className="text-white" style={{ fontSize: '6px' }}>
          {user.username}
        </div>
        <div className="mr-2">
          <a onClick={onToggle}>
          <CogIcon className="text-white" style={{ height: '6px', width: '6px' }} />
          </a>
        </div>
      </div>
    </div>
      )
    }
   </>
  )
}
