import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Context, loadUserAction } from '../store'

export default function CheckUserAuth ({ children }) {
  const { dispatch } = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const res = await axios.get('/api/user/info/', { headers: { Authorization: token } })
          dispatch(loadUserAction(res.data))
          console.log(res.data.sprite)
          if (!res.data.sprite) {
            navigate('/custom', { replace: true })
          }
        } else {
          throw new Error('no token found')
        }
      } catch (err) {
        console.log(err)
        navigate('/signup', { replace: true })
      }
    })()
  }, [])
  return (
    <div className="">

      {children}

    </div>
  )
}
