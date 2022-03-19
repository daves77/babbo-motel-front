import React, { useEffect, useRef } from 'react'

import TextBox from '../components/TextBox'
import SignupForm from '../components/SignupForm'

import images from '../assets'
import Overworld from '../game/Overworld'
import gameConfig from '../gameConfig'
import utils from '../utils'

export default function Signup () {
  const canvasRef = useRef()
  useEffect(() => {
    const overworld = new Overworld({
      canvas: canvasRef.current,
      images,
      player: {
        x: utils.withGrid(7.5),
        y: utils.withGrid(14),
        isPlayerControlled: true
      }
    })

    overworld.init({
      lowerSrc: gameConfig.SignUpRoom.lowerSrc,
      upperSrc: gameConfig.SignUpRoom.upperSrc,
      gameObjects: gameConfig.SignUpRoom.gameObjects,
      cutSceneSpaces: gameConfig.SignUpRoom.cutSceneSpaces
    })
  })

  return (
		<>
			<div className='w-full h-screen '>
					<div className='h-[198px] w-[352px] absolute bottom-0 left-0 right-0 top-0 m-auto outline-dotted outline-1 outline-gray-600 scale-[3]'>
						<canvas
							ref={canvasRef}
							height='198px'
							width='352'
							style={{ imageRendering: 'pixelated' }}
						/>
						<TextBox />
					</div>
				<SignupForm />
			</div>
		</>
  )
}
