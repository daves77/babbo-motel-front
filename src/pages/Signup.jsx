import React, { useEffect, useRef } from 'react'

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
        y: utils.withGrid(10),
        isPlayerControlled: true
      }
    })

    overworld.init({
      lowerSrc: gameConfig.SignUpRoom.lowerSrc,
      upperSrc: gameConfig.SignUpRoom.upperSrc,
      gameObjects: gameConfig.SignUpRoom.gameObjects
    })
  })
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
