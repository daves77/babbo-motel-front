import React, { useEffect, useRef, useContext } from 'react'
import _ from 'lodash'

import images from '../assets'
import Overworld from '../game/Overworld'

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
        const userInfo = store.user
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
                x: utils.withGrid(6),
                y: utils.withGrid(7),
                direction: 'down',
                sprite: userInfo.sprite.main
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
		<div className='h-[198px] w-[352px] relative outline-dotted outline-1 outline-gray-600 m-auto mt-4 scale-[2] translate-y-2/4'>
			<canvas
				ref={canvasRef}
				height='198px'
				width='352'
				style={{ imageRendering: 'pixelated' }}
			/>
		</div>
  )
}
