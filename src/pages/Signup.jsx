import React, { useEffect, useRef } from 'react'

import TextBox from '../components/TextBox'
import LoginModal from '../components/LoginModal'

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
    gameConfig.SignUpRoom.isCutScene = true
    overworld.init(gameConfig.SignUpRoom)
  })

  return (
		<>
			<div className='w-full h-screen '>
					<div className='h-[198px] w-[352px] absolute bottom-0 left-0 right-0 top-0 m-auto scale-[4]'>
						<canvas
							ref={canvasRef}
							height='198px'
							width='352'
              className="rounded"
							style={{ imageRendering: 'pixelated' }}
						/>
						<TextBox />
					</div>
				<LoginModal />
			</div>
		</>
  )
}
