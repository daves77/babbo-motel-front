import React, { useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import _ from 'lodash'

import images from '../assets'
import Overworld from '../game/Overworld'
import Chat from './Chat'
import GameMenu from './GameMenu'
import EditCharacter from './EditCharacter'

import app from '../firebaseConfig'
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  onDisconnect
} from 'firebase/database'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { Context } from '../store'

import utils from '../utils'

export default function GameCanvas () {
  const { store } = useContext(Context)
  const canvasRef = useRef()

  const auth = getAuth(app)
  const db = getDatabase(app)

  let player
  let playerRef

  useEffect(() => {
    if (!_.isEmpty(store.user)) {
      (async () => {
        const res = await axios.get('http://localhost:3004/api/user/info', { headers: { Authorization: `${localStorage.getItem('token')}` } })
        const userInfo = res.data
        const allPlayersRef = ref(db, 'players')

        const overworld = new Overworld({
          canvas: canvasRef.current,
          images,
          player
        })
        overworld.init({})

        onValue(allPlayersRef, (snapshot) => {
          const state = snapshot.val()
          overworld.updatePersons(state)
        })

        signInAnonymously(auth).catch((error) => {
          console.log(error)
        })

        onAuthStateChanged(auth, (user) => {
          try {
            if (user) {
              playerRef = ref(db, `players/${user.uid}`)
              set(playerRef, {
                id: user.uid,
                x: utils.withGrid(15),
                y: utils.withGrid(11),
                direction: 'down',
                sprite: userInfo.sprite.main,
                username: userInfo.username
              })

              onDisconnect(playerRef).remove()
            } else {
              console.log("you're logging out")
            }
          } catch (err) {
            console.error(err)
          }
        })

        onChildAdded(allPlayersRef, (snapshot) => {
          const newPlayer = snapshot.val()
          if (!player) {
            player = newPlayer
          }
          console.log(playerRef)
          overworld.addPerson({
            ...newPlayer,
            playerRef,
            isPlayerControlled: player.id === newPlayer.id
          })
        })
      })()
    }
  }, [store.user])
  return (
		<div className='w-full h-screen'>
			<div className='h-[198px] w-[352px] absolute bottom-0 top-0 right-0 left-0 m-auto scale-[4]'>
         <GameMenu />
				<canvas
					ref={canvasRef}
					height='198'
					width='352'
					className='rounded '
					style={{ imageRendering: 'pixelated' }}
				/>
        <Chat />
			</div>
      <EditCharacter />
		</div>
  )
}
